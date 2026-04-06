import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { Container } from "@/components/ui/container";
import { isActiveSubscriptionStatus, membershipLabel } from "@/lib/membership";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";

export default async function AdminPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login?next=/admin");
  }

  const currentUser = await prisma.user.findUnique({
    where: { id: session.user.id }
  });

  if (!currentUser?.isAdmin) {
    redirect("/dashboard");
  }

  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="py-16">
      <Container className="space-y-8">
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.35em] text-gold">Admin Panel</p>
          <h1 className="font-serif text-5xl text-copy">Member operations at a glance.</h1>
          <p className="max-w-3xl text-lg leading-8 text-muted">
            Review subscription state, Discord connection status, and key user metadata from a single protected page.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          <div className="glass-card rounded-[24px] p-6">
            <p className="text-xs uppercase tracking-[0.24em] text-gold">Total Users</p>
            <p className="mt-3 font-serif text-4xl text-copy">{users.length}</p>
          </div>
          <div className="glass-card rounded-[24px] p-6">
            <p className="text-xs uppercase tracking-[0.24em] text-gold">Active Members</p>
            <p className="mt-3 font-serif text-4xl text-copy">
              {users.filter((user) => isActiveSubscriptionStatus(user.subscriptionStatus)).length}
            </p>
          </div>
          <div className="glass-card rounded-[24px] p-6">
            <p className="text-xs uppercase tracking-[0.24em] text-gold">Discord Connected</p>
            <p className="mt-3 font-serif text-4xl text-copy">
              {users.filter((user) => Boolean(user.discordId)).length}
            </p>
          </div>
        </div>

        <div className="glass-card overflow-hidden rounded-[28px]">
          <div className="grid grid-cols-5 gap-4 border-b border-white/8 px-6 py-4 text-xs uppercase tracking-[0.26em] text-gold">
            <p>User</p>
            <p>Status</p>
            <p>Plan</p>
            <p>Discord</p>
            <p>Joined</p>
          </div>
          <div className="divide-y divide-white/6">
            {users.map((user) => (
              <div className="grid grid-cols-1 gap-4 px-6 py-5 text-sm text-copy md:grid-cols-5" key={user.id}>
                <div>
                  <p className="font-semibold">{user.name ?? user.email ?? user.id}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.18em] text-muted">{user.email ?? "No email"}</p>
                </div>
                <p>{membershipLabel(user.subscriptionStatus)}</p>
                <p>{user.subscriptionPlan.toLowerCase()}</p>
                <p>{user.discordId ? user.discordUsername ?? "Connected" : "Not connected"}</p>
                <p>{formatDate(user.createdAt)}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
