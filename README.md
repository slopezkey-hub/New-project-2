# Icon Bets

Icon Bets is a full-stack premium sports betting website built with Next.js, TailwindCSS, Prisma, PostgreSQL, Stripe subscriptions, NextAuth, and Discord integration.

## Included

- Luxury marketing website with `Home`, `Pricing`, `Login / Signup`, `Dashboard`, `Admin`, and `Success` pages
- Stripe subscription checkout for monthly and yearly memberships
- NextAuth email magic-link login with optional Google sign-in
- PostgreSQL + Prisma user storage
- Protected dashboard and admin experience
- Discord OAuth2 connection flow
- Automatic Discord member join + `Icon VIP` role sync through a bot token
- Stripe webhooks for subscription activation, updates, cancellations, and expiration handling
- Email helpers for welcome and renewal reminder notifications
- Admin panel for user, billing, and Discord connection visibility

## Tech Stack

- Frontend: Next.js App Router + React + TailwindCSS
- Backend: Next.js route handlers
- Database: PostgreSQL + Prisma ORM
- Auth: NextAuth
- Payments: Stripe Checkout + Billing Portal
- Discord: OAuth2 + bot token automation + optional `discord.js` bot process

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Copy the environment template:

```bash
cp .env.example .env.local
```

3. Fill in the required values in `.env.local`.

4. Push the Prisma schema to PostgreSQL:

```bash
npx prisma db push
```

5. Start the app:

```bash
npm run dev
```

6. Optional: open Prisma Studio to inspect users:

```bash
npm run db:studio
```

7. Optional: run the standalone Discord bot presence script:

```bash
npm run bot
```

## Environment Variables

The repo ships with a full [.env.example](/Users/slope/Documents/New project 2/.env.example). The main values are:

- `DATABASE_URL`: PostgreSQL connection string
- `AUTH_SECRET`: NextAuth secret
- `NEXT_PUBLIC_APP_URL`: public app URL, for example `http://localhost:3000`
- `EMAIL_SERVER_*` and `EMAIL_FROM`: SMTP settings for magic links and lifecycle emails
- `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET`: optional Google sign-in
- `STRIPE_SECRET_KEY`: Stripe secret key
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: Stripe publishable key
- `STRIPE_WEBHOOK_SECRET`: Stripe webhook signing secret
- `STRIPE_PRICE_MONTHLY`: recurring monthly price ID
- `STRIPE_PRICE_YEARLY`: recurring yearly price ID
- `DISCORD_CLIENT_ID`: Discord application client ID
- `DISCORD_CLIENT_SECRET`: Discord application secret
- `DISCORD_BOT_TOKEN`: bot token for server membership + role management
- `DISCORD_GUILD_ID`: target Discord server ID
- `DISCORD_VIP_ROLE_ID`: the `Icon VIP` role ID
- `DISCORD_REDIRECT_URI`: Discord OAuth callback URL, for example `http://localhost:3000/api/discord/callback`
- `CRON_SECRET`: bearer token for the renewal reminder cron route

## Stripe Setup

1. In Stripe, create two recurring products:
   - Monthly VIP: `$60 / month`
   - Yearly VIP: `$600 / year`
2. Copy each recurring `price_...` ID into:
   - `STRIPE_PRICE_MONTHLY`
   - `STRIPE_PRICE_YEARLY`
3. Add your Stripe API keys:
   - `STRIPE_SECRET_KEY`
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
4. Create a webhook endpoint that points to:

```text
https://your-domain.com/api/webhooks/stripe
```

5. Subscribe the webhook to at least these events:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
6. Copy the webhook signing secret into `STRIPE_WEBHOOK_SECRET`.

### Billing Behavior

- Checkout creates Stripe subscriptions and redirects back to the dashboard
- The dashboard can open the Stripe Billing Portal
- Webhooks persist subscription state into PostgreSQL
- Active or trialing subscriptions trigger Discord VIP sync
- Canceled, expired, or unpaid subscriptions trigger VIP role removal

## Discord Setup

### 1. Create the Discord Application

1. Open the Discord Developer Portal
2. Create a new application called `Icon Bets`
3. Copy the application `Client ID` and `Client Secret`
4. Add the OAuth2 redirect URI:

```text
http://localhost:3000/api/discord/callback
```

For production, replace this with your live domain callback URL.

### 2. Configure OAuth2

The user connection flow uses these scopes:

- `identify`
- `guilds.join`

### 3. Create the Bot

1. In the same Discord application, create a bot
2. Copy the bot token into `DISCORD_BOT_TOKEN`
3. Invite the bot to your server

Recommended bot permissions:

- `Manage Roles`
- `View Channels`

The bot’s role must sit above the `Icon VIP` role in the server role hierarchy.

### 4. Create the VIP Role

1. In your Discord server, create a role named `Icon VIP`
2. Copy the server ID into `DISCORD_GUILD_ID`
3. Copy the role ID into `DISCORD_VIP_ROLE_ID`

### 5. Add the Bot to the Server

Use the Discord OAuth URL generator or construct one with:

```text
https://discord.com/oauth2/authorize?client_id=YOUR_CLIENT_ID&scope=bot&permissions=268435456
```

`268435456` covers `Manage Roles`. Add more permissions if your server needs them.

### Discord Behavior

- A member clicks `Connect Discord` from the dashboard
- OAuth returns the Discord user profile plus a join-capable access token
- The app stores the Discord ID and tokens
- The app adds the user to the configured server
- The bot assigns the `Icon VIP` role
- Future Stripe webhook changes resync the role automatically

## Auth Setup

### Email Magic Link

NextAuth email login is enabled through SMTP. You can use Resend SMTP, Postmark, SendGrid, or any SMTP-compatible provider.

Required variables:

- `EMAIL_SERVER_HOST`
- `EMAIL_SERVER_PORT`
- `EMAIL_SERVER_USER`
- `EMAIL_SERVER_PASSWORD`
- `EMAIL_FROM`

### Optional Google Login

If you want Google sign-in:

1. Create Google OAuth credentials
2. Set:
   - `GOOGLE_CLIENT_ID`
   - `GOOGLE_CLIENT_SECRET`
3. Add your callback URL:

```text
http://localhost:3000/api/auth/callback/google
```

## Admin Access

The `/admin` page is protected by auth and an `isAdmin` flag in the `User` table.

To promote the first admin, use Prisma Studio or SQL after signing in once:

```sql
update "User" set "isAdmin" = true where email = 'you@example.com';
```

## Renewal Reminder Cron

The app includes:

```text
/api/cron/subscription-reminders
```

Call it with:

```bash
curl -H "Authorization: Bearer $CRON_SECRET" https://your-domain.com/api/cron/subscription-reminders
```

This sends reminder emails to members whose subscription is within three days of renewal and who have not already been reminded for that period.

## Deployment

### Vercel

Recommended for the app frontend and route handlers.

1. Push the repo to GitHub
2. Import the project into Vercel
3. Add all environment variables from `.env.example`
4. Set the production `NEXT_PUBLIC_APP_URL`
5. Point Stripe webhooks and Discord redirect URIs to the live domain
6. Use a hosted PostgreSQL database

### Database / Backend Services

- Vercel + Neon, Supabase, or Railway PostgreSQL all work well
- Railway is also fine if you prefer to host the Node app outside Vercel

## Verification Notes

Validated in this workspace:

- `npm install`
- `npx tsc --noEmit`
- `npm run lint`

Notes:

- A normal `next build` using Turbopack hit a sandbox-level CSS worker restriction in this environment
- A Webpack build was started for extra verification, but it did not complete in the sandbox before stalling
- The codebase itself passed TypeScript and ESLint validation
