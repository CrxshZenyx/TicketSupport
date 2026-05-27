const config = require("../config.json");

module.exports = (client) => {
  client.on("messageCreate", async (message) => {

    if (!message.guild || message.author.bot) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/);
    const cmd = args.shift()?.toLowerCase();

    const command = client.commands.get(cmd);

    if (!command) return;

    // 🔐 MANAGER CHECK (for important commands)
    const managerOnly = ["panel", "add"];

    if (managerOnly.includes(cmd)) {
      if (
        !message.member.permissions.has("Administrator") &&
        !message.member.roles.cache.has(config.managerRole)
      ) {
        return message.reply("❌ You are not allowed to manage the bot.");
      }
    }

    command.run(client, message, args);
  });
};
