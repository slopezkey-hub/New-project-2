"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import type { PlanSlug } from "@/lib/site";
import { Button } from "@/components/ui/button";

export function CheckoutButton({
  authenticated,
  plan,
  label = "Get Access",
  featured = false
}: {
  authenticated: boolean;
  plan: PlanSlug;
  label?: string;
  featured?: boolean;
}) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleCheckout = () => {
    startTransition(async () => {
      setError(null);

      if (!authenticated) {
        router.push(`/login?next=/pricing&plan=${plan}`);
        return;
      }

      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ plan })
      });

      const payload = (await response.json().catch(() => ({}))) as {
        error?: string;
        url?: string;
      };

      if (!response.ok || !payload.url) {
        setError(payload.error ?? "Checkout is unavailable right now.");
        return;
      }

      window.location.assign(payload.url);
    });
  };

  return (
    <div className="space-y-3">
      <Button
        className="w-full"
        disabled={isPending}
        onClick={handleCheckout}
        type="button"
        variant={featured ? "gold" : "outline"}
      >
        {isPending ? "Redirecting..." : label}
      </Button>
      {error ? <p className="text-sm text-rose-300">{error}</p> : null}
    </div>
  );
}
