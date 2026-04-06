import Link from "next/link";

import { auth } from "@/auth";
import { SignOutButton } from "@/components/sign-out-button";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export async function SiteHeader() {
  const session = await auth();

  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-black/50 backdrop-blur-xl">
      <Container className="flex items-center justify-between py-4">
        <Link className="flex items-center gap-3" href="/">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 bg-primary/20 shadow-neon">
            <span className="font-serif text-lg font-semibold text-gold">I</span>
          </div>
          <div>
            <p className="font-serif text-xl font-semibold text-copy">Icon Bets</p>
            <p className="text-xs uppercase tracking-[0.32em] text-muted">VIP Platform</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-muted md:flex">
          <Link className="transition hover:text-copy" href="/pricing">
            Pricing
          </Link>
          <Link className="transition hover:text-copy" href="/dashboard">
            Dashboard
          </Link>
          {session?.user?.isAdmin ? (
            <Link className="transition hover:text-copy" href="/admin">
              Admin
            </Link>
          ) : null}
        </nav>

        <div className="flex items-center gap-3">
          {session?.user ? (
            <>
              <Button className="hidden sm:inline-flex" href="/dashboard" variant="ghost">
                Dashboard
              </Button>
              <SignOutButton />
            </>
          ) : (
            <>
              <Button className="hidden sm:inline-flex" href="/login" variant="ghost">
                Login
              </Button>
              <Button href="/pricing" variant="gold">
                Join Icon VIP
              </Button>
            </>
          )}
        </div>
      </Container>
    </header>
  );
}
