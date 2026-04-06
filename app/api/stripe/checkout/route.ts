import { NextResponse } from "next/server";
import { SubscriptionPlan } from "@prisma/client";

import { auth } from "@/auth";
import { appUrl, stripeConfigured } from "@/lib/env";
import { prisma } from "@/lib/prisma";
import { getStripe, getStripePriceId } from "@/lib/stripe";

export async function POST(request: Request) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "Please sign in before starting checkout." }, { status: 401 });
  }

  if (!stripeConfigured) {
    return NextResponse.json({ error: "Stripe is not configured yet." }, { status: 500 });
  }

  const payload = (await request.json().catch(() => null)) as { plan?: string } | null;
  const plan =
    payload?.plan === "yearly" ? SubscriptionPlan.YEARLY : SubscriptionPlan.MONTHLY;
  const priceId = getStripePriceId(plan);

  if (!priceId) {
    return NextResponse.json({ error: "Stripe price ID is missing for this plan." }, { status: 500 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id }
  });

  if (!user?.email) {
    return NextResponse.json({ error: "A verified user email is required for checkout." }, { status: 400 });
  }

  const stripe = getStripe();
  let customerId = user.stripeCustomerId;

  if (!customerId) {
    const customer = await stripe.customers.create({
      email: user.email,
      name: user.name ?? undefined,
      metadata: {
        userId: user.id
      }
    });

    customerId = customer.id;

    await prisma.user.update({
      where: { id: user.id },
      data: {
        stripeCustomerId: customerId
      }
    });
  }

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer: customerId,
    line_items: [{ price: priceId, quantity: 1 }],
    allow_promotion_codes: true,
    success_url: `${appUrl}/dashboard?checkout=success&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${appUrl}/pricing`,
    metadata: {
      userId: user.id,
      plan
    },
    subscription_data: {
      metadata: {
        userId: user.id,
        plan
      }
    }
  });

  return NextResponse.json({ url: checkoutSession.url });
}
