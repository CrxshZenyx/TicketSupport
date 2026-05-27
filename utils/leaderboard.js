const fs = require("fs");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "leaderboard",

  run: async (client, message) => {

    const data = JSON.parse(fs.readFileSync("./leaderboard.json"));

    const sorted = Object.entries(data)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);

    let desc = "";

    for (let i = 0; i < sorted.length; i++) {
      const [userId, count] = sorted[i];

      desc += `**${i + 1}.** <@${userId}> — **${count} claims**\n`;
    }

    if (!desc) desc = "No claims yet.";

    const embed = new EmbedBuilder()
      .setTitle("🏆 Ticket Claim Leaderboard")
      .setDescription(desc)
      .setColor("Gold");

    message.channel.send({ embeds: [embed] });
  }
};
