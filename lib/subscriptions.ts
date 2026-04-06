import type Stripe from "stripe";

import { SubscriptionPlan, SubscriptionStatus } from "@prisma/client";

import { syncDiscordRoleForUser } from "@/lib/discord";
import { sendWelcomeEmail } from "@/lib/email";
import { isActiveSubscriptionStatus } from "@/lib/membership";
import { prisma } from "@/lib/prisma";
import { getStripe } from "@/lib/stripe";

function mapStripeStatus(status: Stripe.Subscription.Status) {
  switch (status) {
    case "active":
      return SubscriptionStatus.ACTIVE;
    case "trialing":
      return SubscriptionStatus.TRIALING;
    case "past_due":
      return SubscriptionStatus.PAST_DUE;
    case "canceled":
      return SubscriptionStatus.CANCELED;
    case "unpaid":
      return SubscriptionStatus.UNPAID;
    case "incomplete_expired":
      return SubscriptionStatus.EXPIRED;
    default:
      return SubscriptionStatus.INACTIVE;
  }
}

function mapStripePlan(priceId: string | null | undefined) {
  if (!priceId) {
    return SubscriptionPlan.NONE;
  }

  if (priceId === process.env.STRIPE_PRICE_MONTHLY) {
    return SubscriptionPlan.MONTHLY;
  }

  if (priceId === process.env.STRIPE_PRICE_YEARLY) {
    return SubscriptionPlan.YEARLY;
  }

  return SubscriptionPlan.NONE;
}

async function findUserForSubscription({
  customerId,
  subscriptionId,
  metadataUserId
}: {
  customerId: string | null;
  subscriptionId: string | null;
  metadataUserId: string | null;
}) {
  if (metadataUserId) {
    return prisma.user.findUnique({ where: { id: metadataUserId } });
  }

  if (subscriptionId) {
    const bySubscription = await prisma.user.findFirst({
      where: { stripeSubscriptionId: subscriptionId }
    });

    if (bySubscription) {
      return bySubscription;
    }
  }

  if (customerId) {
    return prisma.user.findFirst({
      where: { stripeCustomerId: customerId }
    });
  }

  return null;
}

async function finalizeSubscriptionUpdate(userId: string) {
  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user) {
    return null;
  }

  if (isActiveSubscriptionStatus(user.subscriptionStatus) && !user.welcomeEmailSentAt) {
    await sendWelcomeEmail(user);
    await prisma.user.update({
      where: { id: user.id },
      data: { welcomeEmailSentAt: new Date() }
    });
  }

  await syncDiscordRoleForUser(user.id);

  return prisma.user.findUnique({ where: { id: user.id } });
}

export async function syncStripeSubscription(subscription: Stripe.Subscription) {
  const customerId =
    typeof subscription.customer === "string" ? subscription.customer : subscription.customer.id;
  const metadataUserId = subscription.metadata.userId || null;
  const user = await findUserForSubscription({
    customerId,
    subscriptionId: subscription.id,
    metadataUserId
  });

  if (!user) {
    return null;
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      stripeCustomerId: customerId,
      stripeSubscriptionId: subscription.id,
      subscriptionPlan: mapStripePlan(subscription.items.data[0]?.price.id),
      subscriptionStatus: mapStripeStatus(subscription.status),
      subscriptionCurrentPeriodEnd: subscription.items.data[0]?.current_period_end
        ? new Date(subscription.items.data[0].current_period_end * 1000)
        : null,
      renewalReminderSentAt: null
    }
  });

  return finalizeSubscriptionUpdate(user.id);
}

export async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  const userId = session.metadata?.userId ?? null;
  const customerId =
    typeof session.customer === "string" ? session.customer : session.customer?.id ?? null;

  if (userId && customerId) {
    await prisma.user.update({
      where: { id: userId },
      data: {
        stripeCustomerId: customerId
      }
    });
  }

  if (!session.subscription) {
    return null;
  }

  const stripe = getStripe();
  const subscriptionId =
    typeof session.subscription === "string" ? session.subscription : session.subscription.id;
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);

  return syncStripeSubscription(subscription);
}

export async function syncCheckoutSessionById(sessionId: string, expectedUserId: string) {
  const stripe = getStripe();
  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["subscription"]
  });

  if (session.metadata?.userId !== expectedUserId) {
    throw new Error("Checkout session does not belong to the current user");
  }

  if (session.subscription && typeof session.subscription !== "string") {
    return syncStripeSubscription(session.subscription);
  }

  return handleCheckoutSessionCompleted(session);
}
