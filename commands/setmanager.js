const fs = require("fs");
const config = require("../config.json");

module.exports = {
  name: "setmanager",

  run: async (client, message, args) => {

    // ONLY CURRENT MANAGER OR ADMIN
    if (!message.member.permissions.has("Administrator") &&
        !message.member.roles.cache.has(config.managerRole)) {
      return message.reply("❌ You can't use this command.");
    }

    const role = message.mentions.roles.first();
    if (!role) return message.reply("❌ Mention a role.");

    config.managerRole = role.id;

    fs.writeFileSync("./config.json", JSON.stringify(config, null, 2));

    message.reply(`✅ Manager role set to ${role}`);
  }
};
