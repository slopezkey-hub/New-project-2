import { SubscriptionPlan } from "@prisma/client";

export const siteConfig = {
  name: "Icon Bets",
  headline: "Bet Smarter. Win Like an Icon.",
  description: "Exclusive VIP picks, strategies, and insights.",
  discordRoleName: "Icon VIP"
};

export const membershipPlans = [
  {
    key: SubscriptionPlan.MONTHLY,
    slug: "monthly",
    name: "Monthly VIP",
    description: "High-signal plays, fast alerts, and full VIP Discord access.",
    price: 60,
    interval: "month",
    stripePriceEnvKey: "STRIPE_PRICE_MONTHLY",
    badge: "Popular"
  },
  {
    key: SubscriptionPlan.YEARLY,
    slug: "yearly",
    name: "Yearly VIP",
    description: "Twelve months of premium access with the strongest value.",
    price: 600,
    interval: "year",
    stripePriceEnvKey: "STRIPE_PRICE_YEARLY",
    badge: "Best Value"
  }
] as const;

export type PlanSlug = (typeof membershipPlans)[number]["slug"];

export function getPlanBySlug(slug: string | null | undefined) {
  return membershipPlans.find((plan) => plan.slug === slug);
}

export function getPlanByEnum(plan: SubscriptionPlan) {
  return membershipPlans.find((item) => item.key === plan);
}
