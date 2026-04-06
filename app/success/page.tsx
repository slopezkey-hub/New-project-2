import Link from "next/link";

import { Container } from "@/components/ui/container";

export default function SuccessPage() {
  return (
    <div className="py-20">
      <Container className="max-w-3xl">
        <div className="glass-card rounded-[32px] p-10 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-gold">Purchase Complete</p>
          <h1 className="mt-4 font-serif text-6xl text-copy">You’re in.</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted">
            Your checkout succeeded. Head to the dashboard to confirm membership status, connect Discord, and step into the Icon VIP experience.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              className="inline-flex items-center justify-center rounded-full bg-gold px-6 py-4 text-sm font-semibold uppercase tracking-[0.24em] text-black shadow-glow transition hover:-translate-y-0.5"
              href="/dashboard?checkout=success"
            >
              Go To Dashboard
            </Link>
            <Link
              className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-4 text-sm font-semibold uppercase tracking-[0.24em] text-copy transition hover:border-gold/40 hover:bg-white/10"
              href="/pricing"
            >
              View Plans
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
