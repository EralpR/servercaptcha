const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

// https://github.com/EralpR


module.exports = {
  data: new SlashCommandBuilder().setName("ping").setDescription("Get the bot's ping"),
  async execute(interaction) {
    let circles = {
      good: "<:High:1133500049259761754> ",
      okay: "<:Mid:1133500054079025233> ",
      bad: "<:Low:1133500052539703387>",
    };

// https://github.com/EralpR


    await interaction.deferReply(); // Defer the reply before editing

    const pinging = await interaction.editReply({ content: "Pinging..." });

    const ws = interaction.client.ws.ping; // websocket ping
    const msgEdit = Date.now() - pinging.createdTimestamp; // api latency

    // uptime
    let days = Math.floor(interaction.client.uptime / 86400000);
    let hours = Math.floor(interaction.client.uptime / 3600000) % 24;
    let minutes = Math.floor(interaction.client.uptime / 60000) % 60;
    let seconds = Math.floor(interaction.client.uptime / 1000) % 60;

    const wsEmoji = ws <= 100 ? circles.good : ws <= 200 ? circles.okay : circles.bad;
    const msgEmoji = msgEdit <= 200 ? circles.good : circles.bad;

    const pingEmbed = new EmbedBuilder()
      .setThumbnail(interaction.client.user.displayAvatarURL({ size: 64 }))
      .setColor("Blurple")
      .setTimestamp()
      .setFooter({ text: `Pinged At` })
      .addFields(
        {
          name: "Websocket Latency",
          value: `${wsEmoji} \`${ws}ms\``,
        },
        {
          name: "API Latency",
          value: `${msgEmoji} \`${msgEdit}ms\``,
        },
        {
          name: `${interaction.client.user.username} Uptime`,
          value: `<:Timer:1133500055966470225> \`${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds\``,
        }
      );

    await pinging.edit({ embeds: [pingEmbed], content: "\u200b" });
  },
};

// https://github.com/EralpR

