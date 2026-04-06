export const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

export const emailAuthConfigured = Boolean(
  process.env.EMAIL_SERVER_HOST &&
    process.env.EMAIL_SERVER_PORT &&
    process.env.EMAIL_SERVER_USER &&
    process.env.EMAIL_SERVER_PASSWORD &&
    process.env.EMAIL_FROM
);

export const googleAuthConfigured = Boolean(
  process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
);

export const stripeConfigured = Boolean(
  process.env.STRIPE_SECRET_KEY &&
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY &&
    process.env.STRIPE_PRICE_MONTHLY &&
    process.env.STRIPE_PRICE_YEARLY
);

export const stripeWebhookConfigured = Boolean(process.env.STRIPE_WEBHOOK_SECRET);

export const discordConfigured = Boolean(
  process.env.DISCORD_CLIENT_ID &&
    process.env.DISCORD_CLIENT_SECRET &&
    process.env.DISCORD_BOT_TOKEN &&
    process.env.DISCORD_GUILD_ID &&
    process.env.DISCORD_VIP_ROLE_ID &&
    process.env.DISCORD_REDIRECT_URI
);

export const smtpConfigured = emailAuthConfigured;
