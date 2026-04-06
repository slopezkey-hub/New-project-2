"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export function LoginPanel({
  emailEnabled,
  googleEnabled,
  devAuthEnabled,
  nextPath
}: {
  emailEnabled: boolean;
  googleEnabled: boolean;
  devAuthEnabled: boolean;
  nextPath: string;
}) {
  const [email, setEmail] = useState("");

  return (
    <div className="glass-card rounded-[32px] p-8 sm:p-10">
      <div className="space-y-6">
        <div>
          <p className="text-xs uppercase tracking-[0.32em] text-gold">Member Access</p>
          <h2 className="mt-3 font-serif text-4xl text-copy">Open your VIP account</h2>
        </div>

        <form
          className="space-y-4"
          onSubmit={(event) => {
            event.preventDefault();
            void signIn("email", {
              email,
              callbackUrl: nextPath
            });
          }}
        >
          <label className="block">
            <span className="mb-2 block text-sm text-muted">Email address</span>
            <input
              className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-copy outline-none transition focus:border-gold/50"
              name="email"
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@iconbets.com"
              required
              type="email"
              value={email}
            />
          </label>
          <button
            className="w-full rounded-full bg-gold px-5 py-3 text-sm font-semibold uppercase tracking-[0.24em] text-black shadow-glow transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={!emailEnabled}
            type="submit"
          >
            Send Magic Link
          </button>
        </form>

        {!emailEnabled ? (
          <p className="text-sm text-amber-200">
            Email auth is wired in the codebase, but SMTP environment variables still need to be configured before magic links can send.
          </p>
        ) : null}

        {googleEnabled ? (
          <button
            className="w-full rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold uppercase tracking-[0.24em] text-copy transition hover:border-gold/40 hover:bg-white/10"
            onClick={() => {
              void signIn("google", { callbackUrl: nextPath });
            }}
            type="button"
          >
            Continue With Google
          </button>
        ) : (
          <p className="text-sm text-muted">
            Google login is optional and appears automatically once `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` are set.
          </p>
        )}

        {devAuthEnabled ? (
          <div className="rounded-2xl border border-primary/35 bg-primary/10 p-4">
            <p className="text-xs uppercase tracking-[0.24em] text-gold">Local Dev Login</p>
            <p className="mt-2 text-sm text-copy">
              Use any email to create a local account instantly. Use `admin@iconbets.local` for admin access.
            </p>
            <button
              className="mt-4 w-full rounded-full border border-gold/30 bg-gold/10 px-5 py-3 text-sm font-semibold uppercase tracking-[0.24em] text-gold transition hover:border-gold/60 hover:bg-gold/20"
              onClick={() => {
                if (!email) {
                  return;
                }

                void signIn("dev-login", {
                  email,
                  callbackUrl: nextPath
                });
              }}
              type="button"
            >
              Sign In Locally
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
