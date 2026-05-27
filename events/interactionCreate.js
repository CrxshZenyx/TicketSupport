const { ChannelType, PermissionsBitField, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const config = require("../config.json");
const fs = require("fs");

module.exports = (client) => {

  client.on("interactionCreate", async (interaction) => {

    if (interaction.isStringSelectMenu()) {

      if (interaction.customId === "ticket_menu") {

        const type = interaction.values[0];

        const channel = await interaction.guild.channels.create({
          name: `ticket-${interaction.user.username}`,
          type: ChannelType.GuildText,
          parent: config.categories[type],
          permissionOverwrites: [
            {
              id: interaction.guild.id,
              deny: [PermissionsBitField.Flags.ViewChannel]
            },
            {
              id: interaction.user.id,
              allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages]
            },
            {
              id: config.supportRole,
              allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages]
            }
          ]
        });

        const embed = new EmbedBuilder()
          .setTitle("🎫 Ticket Created")
          .setDescription(`Type: **${type}**`)
          .setColor("Green");

        const buttons = new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setCustomId("claim")
            .setLabel("Claim")
            .setStyle(ButtonStyle.Success),

          new ButtonBuilder()
            .setCustomId("close")
            .setLabel("Close")
            .setStyle(ButtonStyle.Danger)
        );

        channel.send({
          content: `<@${interaction.user.id}>`,
          embeds: [embed],
          components: [buttons]
        });

        interaction.reply({ content: `Ticket created: ${channel}`, ephemeral: true });
      }
    }

    if (interaction.isButton()) {

      const channel = interaction.channel;

      // CLAIM
if (interaction.customId === "claim") {

  const fs = require("fs");
  const data = JSON.parse(fs.readFileSync("./leaderboard.json"));

  data[interaction.user.id] = (data[interaction.user.id] || 0) + 1;
  fs.writeFileSync("./leaderboard.json", JSON.stringify(data, null, 2));

  // Rename channel
  if (interaction.channel.name.startsWith("ticket-")) {
    await interaction.channel.setName(`claimed-${interaction.user.username}`);
  }

  // LOCK SYSTEM
  await interaction.channel.permissionOverwrites.edit(interaction.guild.id, {
    SendMessages: false,
    ViewChannel: true
  });

  await interaction.channel.permissionOverwrites.edit(interaction.user.id, {
    SendMessages: true,
    ViewChannel: true
  });

  await interaction.channel.permissionOverwrites.edit(config.supportRole, {
    SendMessages: true,
    ViewChannel: true
  });

  await interaction.channel.setTopic(`🔒 Claimed by ${interaction.user.tag}`);

  return interaction.reply({
    content: `🔒 Ticket claimed and locked by <@${interaction.user.id}>`,
    ephemeral: false
  });
}
      // CLOSE
      if (interaction.customId === "close") {

        const messages = await channel.messages.fetch();
        let transcript = "";

        messages.reverse().forEach(m => {
          transcript += `[${m.author.tag}] ${m.content}\n`;
        });

        fs.writeFileSync(`./transcript-${channel.id}.txt`, transcript);

        await channel.send("Closing ticket...");

        setTimeout(() => channel.delete(), 3000);
      }
    }
  });
};
