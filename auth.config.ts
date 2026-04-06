import { SubscriptionPlan, SubscriptionStatus } from "@prisma/client";
import type { NextAuthOptions } from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import Email from "next-auth/providers/email";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import { emailAuthConfigured, googleAuthConfigured } from "@/lib/env";
import { prisma } from "@/lib/prisma";

const devAuthEnabled = process.env.ENABLE_DEV_AUTH === "true";

const providers: NextAuthOptions["providers"] = [
  Email({
    server: {
      host: process.env.EMAIL_SERVER_HOST ?? "",
      port: Number(process.env.EMAIL_SERVER_PORT ?? "587"),
      auth: {
        user: process.env.EMAIL_SERVER_USER ?? "",
        pass: process.env.EMAIL_SERVER_PASSWORD ?? ""
      }
    },
    from: process.env.EMAIL_FROM ?? "Icon Bets <hello@example.com>"
  })
];

if (devAuthEnabled) {
  providers.push(
    Credentials({
      id: "dev-login",
      name: "Development Login",
      credentials: {
        email: {
          label: "Email",
          type: "email"
        }
      },
      async authorize(credentials) {
        const email = credentials?.email?.toString().trim().toLowerCase();

        if (!email) {
          return null;
        }

        const existing = await prisma.user.findUnique({
          where: { email }
        });

        if (existing) {
          return existing;
        }

        return prisma.user.create({
          data: {
            email,
            name: email.split("@")[0],
            isAdmin: email === (process.env.DEV_ADMIN_EMAIL ?? "").toLowerCase()
          }
        });
      }
    })
  );
}

if (googleAuthConfigured) {
  providers.push(
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    })
  );
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "database"
  },
  providers,
  pages: {
    signIn: "/login",
    verifyRequest: "/login?sent=1"
  },
  callbacks: {
    async signIn({ account }) {
      if (account?.provider === "email" && !emailAuthConfigured) {
        return false;
      }

      return true;
    },
    session({ session, user }) {
      const dbUser = user as typeof user & {
        isAdmin?: boolean;
        subscriptionPlan?: SubscriptionPlan;
        subscriptionStatus?: SubscriptionStatus;
      };

      if (session.user) {
        session.user.id = user.id;
        session.user.isAdmin = dbUser.isAdmin ?? false;
        session.user.subscriptionPlan = dbUser.subscriptionPlan ?? SubscriptionPlan.NONE;
        session.user.subscriptionStatus = dbUser.subscriptionStatus ?? SubscriptionStatus.INACTIVE;
      }

      return session;
    }
  }
};
