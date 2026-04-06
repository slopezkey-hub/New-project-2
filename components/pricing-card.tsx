import { Check } from "lucide-react";

import { SubscriptionPlan } from "@prisma/client";
import { CheckoutButton } from "@/components/checkout-button";
import { cn, formatCurrency } from "@/lib/utils";

export function PricingCard({
  name,
  description,
  price,
  interval,
  badge,
  plan,
  authenticated,
  featured = false
}: {
  name: string;
  description: string;
  price: number;
  interval: string;
  badge: string;
  plan: SubscriptionPlan;
  authenticated: boolean;
  featured?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[28px] border bg-card-gradient p-8",
        featured
          ? "border-gold/50 shadow-glow"
          : "border-primary/35 shadow-[0_0_24px_rgba(106,13,173,0.14)]"
      )}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent" />
      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <p className="font-serif text-3xl font-semibold text-copy">{name}</p>
          <p className="mt-2 max-w-sm text-sm leading-7 text-muted">{description}</p>
        </div>
        <span className="rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-gold">
          {badge}
        </span>
      </div>

      <div className="mb-8 flex items-end gap-2">
        <span className="font-serif text-5xl font-semibold text-copy">{formatCurrency(price)}</span>
        <span className="pb-1 text-sm uppercase tracking-[0.24em] text-muted">/{interval}</span>
      </div>

      <div className="mb-8 space-y-3 text-sm text-copy">
        {[
          "Expert picks and strategy drops",
          "Real-time alerts and lineup edges",
          "Private Icon VIP Discord access",
          "Member dashboard and billing portal"
        ].map((item) => (
          <div className="flex items-center gap-3" key={item}>
            <Check className="h-4 w-4 text-gold" />
            <span>{item}</span>
          </div>
        ))}
      </div>

      <CheckoutButton
        authenticated={authenticated}
        featured={featured}
        label="Get Access"
        plan={plan === SubscriptionPlan.MONTHLY ? "monthly" : "yearly"}
      />
    </div>
  );
}
