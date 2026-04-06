import { SubscriptionStatus } from "@prisma/client";

const activeStatuses = new Set<SubscriptionStatus>([
  SubscriptionStatus.ACTIVE,
  SubscriptionStatus.TRIALING
]);

export function isActiveSubscriptionStatus(status: SubscriptionStatus | null | undefined) {
  return status ? activeStatuses.has(status) : false;
}

export function membershipLabel(status: SubscriptionStatus | null | undefined) {
  switch (status) {
    case SubscriptionStatus.ACTIVE:
      return "Active";
    case SubscriptionStatus.TRIALING:
      return "Trialing";
    case SubscriptionStatus.PAST_DUE:
      return "Past Due";
    case SubscriptionStatus.CANCELED:
      return "Canceled";
    case SubscriptionStatus.UNPAID:
      return "Unpaid";
    case SubscriptionStatus.EXPIRED:
      return "Expired";
    default:
      return "Inactive";
  }
}
