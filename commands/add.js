module.exports = {
  name: "add",

  run: async (client, message, args) => {

    if (!message.channel.name.startsWith("ticket")) return;

    const user = message.mentions.users.first();
    const role = message.mentions.roles.first();

    if (user) {
      message.channel.permissionOverwrites.edit(user.id, {
        ViewChannel: true,
        SendMessages: true
      });
      return message.reply("User added to ticket.");
    }

    if (role) {
      message.channel.permissionOverwrites.edit(role.id, {
        ViewChannel: true,
        SendMessages: true
      });
      return message.reply("Role added to ticket.");
    }

    message.reply("You must mention a user or role.");
  }
};
