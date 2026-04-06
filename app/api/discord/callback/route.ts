import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { auth } from "@/auth";
import {
  exchangeDiscordCode,
  fetchDiscordProfile,
  storeDiscordConnection,
  syncDiscordRoleForUser
} from "@/lib/discord";

export async function GET(request: Request) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.redirect(new URL("/login?next=/dashboard", request.url));
  }

  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const error = url.searchParams.get("error");
  const cookieStore = await cookies();
  const storedState = cookieStore.get("discord_oauth_state")?.value;

  cookieStore.delete("discord_oauth_state");

  if (error || !code || !state || state !== storedState) {
    return NextResponse.redirect(new URL("/dashboard?discord=failed", request.url));
  }

  try {
    const token = await exchangeDiscordCode(code);
    const profile = await fetchDiscordProfile(token.access_token);

    await storeDiscordConnection(session.user.id, token, profile);
    await syncDiscordRoleForUser(session.user.id);

    return NextResponse.redirect(new URL("/dashboard?discord=connected", request.url));
  } catch (callbackError) {
    console.error("Discord callback failed", callbackError);
    return NextResponse.redirect(new URL("/dashboard?discord=failed", request.url));
  }
}
