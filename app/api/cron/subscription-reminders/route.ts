import { NextResponse } from "next/server";
import { SubscriptionStatus } from "@prisma/client";

import { sendRenewalReminderEmail } from "@/lib/email";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  const expected = process.env.CRON_SECRET;

  if (!expected || authHeader !== `Bearer ${expected}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const now = new Date();
  const windowEnd = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
  const users = await prisma.user.findMany({
    where: {
      subscriptionStatus: {
        in: [SubscriptionStatus.ACTIVE, SubscriptionStatus.TRIALING]
      },
      subscriptionCurrentPeriodEnd: {
        gte: now,
        lte: windowEnd
      },
      renewalReminderSentAt: null
    }
  });

  for (const user of users) {
    await sendRenewalReminderEmail(user);
    await prisma.user.update({
      where: { id: user.id },
      data: {
        renewalReminderSentAt: new Date()
      }
    });
  }

  return NextResponse.json({ sent: users.length });
}
