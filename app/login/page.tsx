import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { LoginPanel } from "@/components/login-panel";
import { Container } from "@/components/ui/container";
import { emailAuthConfigured, googleAuthConfigured } from "@/lib/env";
import { safeRedirect } from "@/lib/utils";

type LoginSearchParams = Promise<{
  next?: string;
  plan?: string;
  sent?: string;
}>;

export default async function LoginPage({
  searchParams
}: {
  searchParams: LoginSearchParams;
}) {
  const session = await auth();
  const params = await searchParams;
  const nextPath = safeRedirect(params.next, "/dashboard");

  if (session?.user) {
    redirect(nextPath as never);
  }

  return (
    <div className="py-20">
      <Container className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="space-y-5">
          <p className="text-sm uppercase tracking-[0.35em] text-gold">Login / Signup</p>
          <h1 className="font-serif text-6xl text-copy">Access your Icon Bets dashboard.</h1>
          <p className="max-w-xl text-lg leading-8 text-muted">
            Sign in with email magic link, and optionally add Google for a faster login flow. Once you’re in, checkout and Discord access are tied to the same account.
          </p>
          {params.plan ? (
            <div className="rounded-2xl border border-gold/30 bg-gold/10 px-4 py-3 text-sm text-copy">
              Selected plan: <span className="font-semibold capitalize">{params.plan}</span>
            </div>
          ) : null}
          {params.sent ? (
            <div className="rounded-2xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-100">
              Your magic link is on the way. Check your inbox to continue.
            </div>
          ) : null}
        </div>

        <LoginPanel
          devAuthEnabled={process.env.ENABLE_DEV_AUTH === "true"}
          emailEnabled={emailAuthConfigured}
          googleEnabled={googleAuthConfigured}
          nextPath={nextPath}
        />
      </Container>
    </div>
  );
}
