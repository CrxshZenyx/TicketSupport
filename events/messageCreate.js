const config = require("../config.json");

module.exports = (client) => {
  client.on("messageCreate", async (message) => {

    if (!message.guild || message.author.bot) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/);
    const cmd = args.shift()?.toLowerCase();

    const command = client.commands.get(cmd);
    if (command) command.run(client, message, args);
  });
};
