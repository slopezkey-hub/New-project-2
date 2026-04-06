import type { User } from "@prisma/client";

import { discordConfigured } from "@/lib/env";
import { isActiveSubscriptionStatus } from "@/lib/membership";
import { prisma } from "@/lib/prisma";

type DiscordTokenResponse = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
};

type DiscordProfile = {
  id: string;
  username: string;
  global_name?: string | null;
};

async function discordBotRequest(path: string, init?: RequestInit) {
  const token = process.env.DISCORD_BOT_TOKEN;

  if (!token) {
    throw new Error("Missing DISCORD_BOT_TOKEN");
  }

  const response = await fetch(`https://discord.com/api/v10${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bot ${token}`,
      ...(init?.headers ?? {})
    }
  });

  if (!response.ok) {
    throw new Error(`Discord API request failed (${response.status})`);
  }

  return response;
}

export function getDiscordAuthorizeUrl(state: string) {
  const url = new URL("https://discord.com/oauth2/authorize");

  url.searchParams.set("client_id", process.env.DISCORD_CLIENT_ID ?? "");
  url.searchParams.set("response_type", "code");
  url.searchParams.set("redirect_uri", process.env.DISCORD_REDIRECT_URI ?? "");
  url.searchParams.set("scope", "identify guilds.join");
  url.searchParams.set("prompt", "consent");
  url.searchParams.set("state", state);

  return url.toString();
}

async function requestDiscordToken(body: URLSearchParams) {
  const response = await fetch("https://discord.com/api/oauth2/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body
  });

  if (!response.ok) {
    throw new Error("Discord token exchange failed");
  }

  return (await response.json()) as DiscordTokenResponse;
}

export async function exchangeDiscordCode(code: string) {
  return requestDiscordToken(
    new URLSearchParams({
      client_id: process.env.DISCORD_CLIENT_ID ?? "",
      client_secret: process.env.DISCORD_CLIENT_SECRET ?? "",
      grant_type: "authorization_code",
      code,
      redirect_uri: process.env.DISCORD_REDIRECT_URI ?? ""
    })
  );
}

async function refreshDiscordToken(refreshToken: string) {
  return requestDiscordToken(
    new URLSearchParams({
      client_id: process.env.DISCORD_CLIENT_ID ?? "",
      client_secret: process.env.DISCORD_CLIENT_SECRET ?? "",
      grant_type: "refresh_token",
      refresh_token: refreshToken
    })
  );
}

export async function fetchDiscordProfile(accessToken: string) {
  const response = await fetch("https://discord.com/api/users/@me", {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  if (!response.ok) {
    throw new Error("Discord user lookup failed");
  }

  return (await response.json()) as DiscordProfile;
}

export async function storeDiscordConnection(
  userId: string,
  token: DiscordTokenResponse,
  profile: DiscordProfile
) {
  return prisma.user.update({
    where: { id: userId },
    data: {
      discordId: profile.id,
      discordUsername: profile.global_name || profile.username,
      discordAccessToken: token.access_token,
      discordRefreshToken: token.refresh_token,
      discordTokenExpiresAt: new Date(Date.now() + token.expires_in * 1000),
      discordConnectedAt: new Date()
    }
  });
}

async function getUsableDiscordAccessToken(user: Pick<User, "id" | "discordAccessToken" | "discordRefreshToken" | "discordTokenExpiresAt">) {
  if (!user.discordAccessToken) {
    return null;
  }

  if (user.discordTokenExpiresAt && user.discordTokenExpiresAt.getTime() > Date.now() + 60_000) {
    return user.discordAccessToken;
  }

  if (!user.discordRefreshToken) {
    return user.discordAccessToken;
  }

  const refreshed = await refreshDiscordToken(user.discordRefreshToken);

  await prisma.user.update({
    where: { id: user.id },
    data: {
      discordAccessToken: refreshed.access_token,
      discordRefreshToken: refreshed.refresh_token,
      discordTokenExpiresAt: new Date(Date.now() + refreshed.expires_in * 1000)
    }
  });

  return refreshed.access_token;
}

export async function syncDiscordRoleForUser(userId: string) {
  if (!discordConfigured) {
    return;
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      discordId: true,
      discordAccessToken: true,
      discordRefreshToken: true,
      discordTokenExpiresAt: true,
      subscriptionStatus: true
    }
  });

  if (!user?.discordId) {
    return;
  }

  const guildId = process.env.DISCORD_GUILD_ID!;
  const roleId = process.env.DISCORD_VIP_ROLE_ID!;
  try {
    if (isActiveSubscriptionStatus(user.subscriptionStatus)) {
      const accessToken = await getUsableDiscordAccessToken(user);

      if (accessToken) {
        await discordBotRequest(`/guilds/${guildId}/members/${user.discordId}`, {
          method: "PUT",
          body: JSON.stringify({
            access_token: accessToken
          })
        });
      }

      await discordBotRequest(`/guilds/${guildId}/members/${user.discordId}/roles/${roleId}`, {
        method: "PUT"
      });
      return;
    }

    await discordBotRequest(`/guilds/${guildId}/members/${user.discordId}/roles/${roleId}`, {
      method: "DELETE"
    });
  } catch (error) {
    console.error("Discord sync failed", error);
  }
}
