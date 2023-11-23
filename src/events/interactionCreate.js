const { Interaction } = require("discord.js");
const fetch = require("node-fetch");

// https://github.com/EralpR


module.exports = {
  name: "interactionCreate",
  async execute(interaction, client, err) {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
      await command.execute(interaction, client).catch(err);
    } catch (error) {
      console.log(error);

      try {
        await interaction.reply({
          content: "An **error** occured! Please use the command again. If this issue continues contact **crexy_** ",
          ephemeral: true,
        });
      } catch (err) {
        return;
      }
    }
  },
};

// https://github.com/EralpR

