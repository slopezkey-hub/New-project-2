import { auth } from "@/auth";
import { PricingCard } from "@/components/pricing-card";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { membershipPlans } from "@/lib/site";

export default async function PricingPage() {
  const session = await auth();

  return (
    <div className="pb-24 pt-16">
      <Container className="space-y-12">
        <SectionHeading
          description="Secure billing through Stripe, membership syncing into your dashboard, and Discord access automation once your subscription is active."
          eyebrow="Membership"
          title="Premium pricing for serious bettors."
        />

        <div className="grid gap-6 lg:grid-cols-2">
          {membershipPlans.map((plan) => (
            <PricingCard
              authenticated={Boolean(session?.user)}
              badge={plan.badge}
              description={plan.description}
              featured={plan.slug === "yearly"}
              interval={plan.interval}
              key={plan.slug}
              name={plan.name}
              plan={plan.key}
              price={plan.price}
            />
          ))}
        </div>

        <div className="glass-card rounded-[28px] p-8">
          <h3 className="font-serif text-3xl text-copy">Every plan includes</h3>
          <div className="mt-6 grid gap-4 text-sm text-muted sm:grid-cols-2">
            <p>Protected member dashboard</p>
            <p>Stripe subscription management</p>
            <p>Discord OAuth connection</p>
            <p>Automatic Icon VIP role assignment</p>
            <p>Admin visibility into member status</p>
            <p>Welcome and renewal reminder email hooks</p>
          </div>
        </div>
      </Container>
    </div>
  );
}
