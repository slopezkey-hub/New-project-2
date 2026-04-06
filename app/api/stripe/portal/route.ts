import { NextResponse } from "next/server";

import { auth } from "@/auth";
import { appUrl } from "@/lib/env";
import { prisma } from "@/lib/prisma";
import { getStripe } from "@/lib/stripe";

export async function POST() {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "Please sign in first." }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id }
  });

  if (!user?.stripeCustomerId) {
    return NextResponse.json({ error: "No Stripe customer found for this account." }, { status: 400 });
  }

  const stripe = getStripe();
  const portalSession = await stripe.billingPortal.sessions.create({
    customer: user.stripeCustomerId,
    return_url: `${appUrl}/dashboard`
  });

  return NextResponse.json({ url: portalSession.url });
}
