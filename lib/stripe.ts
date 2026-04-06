import Stripe from "stripe";

import { SubscriptionPlan } from "@prisma/client";
import { getPlanByEnum } from "@/lib/site";

let stripeClient: Stripe | null = null;

export function getStripe() {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("Missing STRIPE_SECRET_KEY");
  }

  stripeClient ??= new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2026-02-25.clover",
    typescript: true
  });

  return stripeClient;
}

export function getStripePriceId(plan: SubscriptionPlan) {
  const record = getPlanByEnum(plan);

  if (!record) {
    return null;
  }

  return process.env[record.stripePriceEnvKey] ?? null;
}
