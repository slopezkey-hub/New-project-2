import Link from "next/link";
import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { CustomerPortalButton } from "@/components/customer-portal-button";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { discordConfigured } from "@/lib/env";
import { membershipLabel } from "@/lib/membership";
import { prisma } from "@/lib/prisma";
import { siteConfig } from "@/lib/site";
import { syncCheckoutSessionById } from "@/lib/subscriptions";
import { formatDate } from "@/lib/utils";

type DashboardSearchParams = Promise<{
  checkout?: string;
  discord?: string;
  session_id?: string;
}>;

export default async function DashboardPage({
  searchParams
}: {
  searchParams: DashboardSearchParams;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login?next=/dashboard");
  }

  const params = await searchParams;

  if (params.session_id) {
    await syncCheckoutSessionById(params.session_id, session.user.id).catch((error) => {
      console.error("Checkout sync failed", error);
    });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id }
  });

  if (!user) {
    redirect("/login?next=/dashboard");
  }

  const notices = [
    params.checkout === "success"
      ? "Your Stripe checkout completed. Membership status has been refreshed below."
      : null,
    params.discord === "connected"
      ? "Discord connected successfully. Your VIP role sync has been triggered."
      : null,
    params.discord === "membership-required"
      ? "An active membership is required before Discord access can be connected."
      : null,
    params.discord === "config-missing"
      ? "Discord integration is not configured yet. Add the required environment variables first."
      : null,
    params.discord === "failed"
      ? "Discord connection failed. Check the Discord app credentials and redirect URI."
      : null
  ].filter(Boolean) as string[];

  return (
    <div className="py-16">
      <Container className="space-y-8">
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.35em] text-gold">Dashboard</p>
          <h1 className="font-serif text-5xl text-copy">Welcome back, {user.name ?? user.email?.split("@")[0] ?? "Icon Member"}.</h1>
          <p className="max-w-3xl text-lg leading-8 text-muted">
            Your billing, Discord access, and premium membership status all live here.
          </p>
        </div>

        {notices.length ? (
          <div className="space-y-3">
            {notices.map((notice) => (
              <div className="rounded-2xl border border-gold/30 bg-gold/10 px-4 py-3 text-sm text-copy" key={notice}>
                {notice}
              </div>
            ))}
          </div>
        ) : null}

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="glass-card rounded-[28px] p-8">
            <p className="text-xs uppercase tracking-[0.32em] text-gold">Membership</p>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <h2 className="font-serif text-4xl text-copy">Your Membership: {membershipLabel(user.subscriptionStatus)}</h2>
              <span className="rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs uppercase tracking-[0.25em] text-copy">
                {user.subscriptionPlan.toLowerCase()}
              </span>
            </div>
            <div className="mt-6 grid gap-4 text-sm text-muted sm:grid-cols-2">
              <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-5">
                <p className="uppercase tracking-[0.22em] text-gold">Renewal Date</p>
                <p className="mt-3 text-lg text-copy">{formatDate(user.subscriptionCurrentPeriodEnd)}</p>
              </div>
              <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-5">
                <p className="uppercase tracking-[0.22em] text-gold">Discord Status</p>
                <p className="mt-3 text-lg text-copy">
                  {user.discordId ? `Connected as ${user.discordUsername ?? user.discordId}` : "Not connected"}
                </p>
              </div>
            </div>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button href="/pricing" variant="gold">
                Upgrade Membership
              </Button>
              {user.stripeCustomerId ? <CustomerPortalButton /> : null}
            </div>
          </div>

          <div className="glass-card rounded-[28px] p-8">
            <p className="text-xs uppercase tracking-[0.32em] text-gold">Discord Access</p>
            <h2 className="mt-4 font-serif text-4xl text-copy">{siteConfig.discordRoleName}</h2>
            <p className="mt-4 text-sm leading-7 text-muted">
              Connect Discord to let the app add you into the server and apply the VIP role automatically when your subscription is active.
            </p>
            <div className="mt-8 space-y-3">
              {discordConfigured ? (
                <Button href="/api/discord/connect" variant="gold">
                  Connect Discord
                </Button>
              ) : (
                <Button disabled variant="outline">
                  Connect Discord
                </Button>
              )}
              <p className="text-xs uppercase tracking-[0.22em] text-muted">
                {discordConfigured
                  ? "Bot credentials detected"
                  : "Discord client, bot token, guild, role, and redirect URI still need env setup"}
              </p>
            </div>
            <div className="mt-8 rounded-2xl border border-white/8 bg-white/[0.03] p-5 text-sm text-muted">
              If a subscription expires or is canceled, the webhook flow removes the VIP role automatically.
            </div>
          </div>
        </div>

        <div className="glass-card rounded-[28px] p-8">
          <p className="text-xs uppercase tracking-[0.32em] text-gold">Quick Links</p>
          <div className="mt-6 flex flex-col gap-4 sm:flex-row">
            <Button href="/pricing" variant="ghost">
              View Pricing
            </Button>
            <Button href="/success" variant="ghost">
              Purchase Success Page
            </Button>
            {session.user.isAdmin ? (
              <Button href="/admin" variant="ghost">
                Open Admin Panel
              </Button>
            ) : null}
          </div>
          <p className="mt-5 text-sm text-muted">
            Need setup help? The README in this repo walks through Stripe products, Discord bot setup, bot invites, and webhook configuration.
          </p>
          <p className="mt-2 text-sm text-muted">
            Back to <Link className="text-gold" href="/">home</Link>.
          </p>
        </div>
      </Container>
    </div>
  );
}
