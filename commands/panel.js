const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require("discord.js");
const config = require("../config.json");

module.exports = {
  name: "panel",

  run: async (client, message) => {

    const embed = new EmbedBuilder()
      .setTitle("# GHETTO DREAMS")
      .setDescription("***If you have any questions, issues, or inquiries, please click the button below to start a private conversation with our staff team.***")
      .setImage(config.panelImage)
      .setColor("Black");

    const menu = new StringSelectMenuBuilder()
      .setCustomId("ticket_menu")
      .setPlaceholder("Click Here To Open A Ticket")
      .addOptions([
        {
          label: "Buy",
          emoji: "💰",
          value: "buy"
        },
        {
          label: "Claim Giveaways",
          emoji: "🎁",
          value: "giveaway"
        },
        {
          label: "Other",
          emoji: "❓",
          value: "other"
        }
      ]);

    message.channel.send({
      embeds: [embed],
      components: [new ActionRowBuilder().addComponents(menu)]
    });
  }
};
