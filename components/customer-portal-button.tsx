"use client";

import { useState, useTransition } from "react";

import { Button } from "@/components/ui/button";

export function CustomerPortalButton() {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const openPortal = () => {
    startTransition(async () => {
      setError(null);

      const response = await fetch("/api/stripe/portal", {
        method: "POST"
      });

      const payload = (await response.json().catch(() => ({}))) as {
        error?: string;
        url?: string;
      };

      if (!response.ok || !payload.url) {
        setError(payload.error ?? "Unable to open the billing portal.");
        return;
      }

      window.location.assign(payload.url);
    });
  };

  return (
    <div className="space-y-3">
      <Button onClick={openPortal} type="button" variant="ghost">
        {isPending ? "Opening..." : "Manage Billing"}
      </Button>
      {error ? <p className="text-sm text-rose-300">{error}</p> : null}
    </div>
  );
}
