import nodemailer from "nodemailer";

import type { User } from "@prisma/client";

import { smtpConfigured } from "@/lib/env";
import { siteConfig } from "@/lib/site";
import { formatDate } from "@/lib/utils";

function getTransport() {
  if (!smtpConfigured) {
    return null;
  }

  return nodemailer.createTransport({
    host: process.env.EMAIL_SERVER_HOST,
    port: Number(process.env.EMAIL_SERVER_PORT ?? "587"),
    secure: Number(process.env.EMAIL_SERVER_PORT ?? "587") === 465,
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD
    }
  });
}

export async function sendWelcomeEmail(user: Pick<User, "email" | "name" | "subscriptionCurrentPeriodEnd">) {
  const transport = getTransport();

  if (!transport || !user.email) {
    return;
  }

  await transport.sendMail({
    from: process.env.EMAIL_FROM,
    to: user.email,
    subject: `Welcome to ${siteConfig.name} VIP`,
    html: `
      <div style="background:#0A0A0A;padding:32px;font-family:Arial,sans-serif;color:#F6F1FF">
        <h1 style="margin:0 0 12px;color:#D4AF37;">Welcome to ${siteConfig.name}</h1>
        <p style="margin:0 0 16px;">${user.name ?? "VIP member"}, your subscription is active and your dashboard is ready.</p>
        <p style="margin:0 0 16px;">Current access runs through ${formatDate(user.subscriptionCurrentPeriodEnd)}.</p>
        <p style="margin:0;color:#B7ABC8;">Open your dashboard to connect Discord and unlock the Icon VIP role.</p>
      </div>
    `
  });
}

export async function sendRenewalReminderEmail(
  user: Pick<User, "email" | "name" | "subscriptionCurrentPeriodEnd">
) {
  const transport = getTransport();

  if (!transport || !user.email) {
    return;
  }

  await transport.sendMail({
    from: process.env.EMAIL_FROM,
    to: user.email,
    subject: `${siteConfig.name} membership renewal reminder`,
    html: `
      <div style="background:#0A0A0A;padding:32px;font-family:Arial,sans-serif;color:#F6F1FF">
        <h1 style="margin:0 0 12px;color:#D4AF37;">Your VIP access is about to renew</h1>
        <p style="margin:0 0 16px;">${user.name ?? "Member"}, your current Icon Bets membership period ends on ${formatDate(
          user.subscriptionCurrentPeriodEnd
        )}.</p>
        <p style="margin:0;color:#B7ABC8;">Visit your dashboard any time to manage billing or reconnect Discord.</p>
      </div>
    `
  });
}
