import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { auth } from "@/auth";
import { getDiscordAuthorizeUrl } from "@/lib/discord";
import { discordConfigured } from "@/lib/env";
import { isActiveSubscriptionStatus } from "@/lib/membership";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.redirect(new URL("/login?next=/dashboard", request.url));
  }

  if (!discordConfigured) {
    return NextResponse.redirect(new URL("/dashboard?discord=config-missing", request.url));
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id }
  });

  if (!user || !isActiveSubscriptionStatus(user.subscriptionStatus)) {
    return NextResponse.redirect(new URL("/dashboard?discord=membership-required", request.url));
  }

  const state = crypto.randomUUID();
  const cookieStore = await cookies();

  cookieStore.set("discord_oauth_state", state, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 10
  });

  return NextResponse.redirect(getDiscordAuthorizeUrl(state));
}
