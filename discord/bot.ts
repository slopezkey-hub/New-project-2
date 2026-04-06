import { Client, Events, GatewayIntentBits } from "discord.js";

if (!process.env.DISCORD_BOT_TOKEN) {
  throw new Error("Missing DISCORD_BOT_TOKEN");
}

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers]
});

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Icon Bets bot connected as ${readyClient.user.tag}`);
});

client.login(process.env.DISCORD_BOT_TOKEN);
