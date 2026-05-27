const { Client, GatewayIntentBits, Partials, Collection } = require("discord.js");
const config = require("./config.json");
const fs = require("fs");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ],
  partials: [Partials.Channel]
});

client.commands = new Collection();

// Load commands
for (const file of fs.readdirSync("./commands")) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

// Events
require("./events/messageCreate")(client);
require("./events/interactionCreate")(client);

client.login(config.token);
