import { SubscriptionPlan, SubscriptionStatus } from "@prisma/client";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id: string;
      isAdmin: boolean;
      subscriptionPlan: SubscriptionPlan;
      subscriptionStatus: SubscriptionStatus;
    };
  }
}
