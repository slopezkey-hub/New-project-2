import { Container } from "@/components/ui/container";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/5 bg-black/30">
      <Container className="flex flex-col gap-4 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>Icon Bets is a premium sports betting membership platform.</p>
        <p>Built for Vercel, PostgreSQL, Stripe, NextAuth, and Discord.</p>
      </Container>
    </footer>
  );
}
