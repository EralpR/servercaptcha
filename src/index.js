const {
  Client,
  GatewayIntentBits,
  ModalBuilder,
  Partials,
  ActivityType,
  AttachmentBuilder,
  StringSelectMenuBuilder,
  ActionRowBuilder,
  ComponentType,
  ButtonBuilder,
  ButtonStyle,
  TextInputBuilder,
  TextInputStyle,
  EmbedBuilder,
  PermissionsBitField,
  Permissions,
  MessageManager,
  Embed,
  Collection,
  ChannelType,
  Events,
  MessageType,
  UserFlagsBitField,
  InteractionResponse,
  ReactionUserManager,
} = require(`discord.js`);
const fs = require("fs");
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.DirectMessageTyping,
  ],
  partials: [Partials.Channel, Partials.Reaction, Partials.Message],
});

client.on("ready", async (client) => {
  setInterval(() => {
    let activities = [
      { type: "Playing", name: "/verify setup" },
      { type: "Playing", name: "The best captcha bot!" },
      { type: "Watching", name: `crexy_` },
    ];

    const status = activities[Math.floor(Math.random() * activities.length)];

    if (status.type === "Watching") {
      client.user.setPresence({ activities: [{ name: `${status.name}`, type: ActivityType.Watching }] });
    } else {
      client.user.setPresence({ activities: [{ name: `${status.name}`, type: ActivityType.Playing }] });
    }
  }, 3000);
});

const axios = require("axios");
const fetch = require("node-fetch");
const { AutoPoster } = require("topgg-autoposter");
const { CaptchaGenerator } = require("captcha-canvas");
const capschema = require("./Schemas.js/verify");
const verifyusers = require("./Schemas.js/verifyusers");

client.commands = new Collection();

require("dotenv").config();

const functions = fs.readdirSync("./src/functions").filter((file) => file.endsWith(".js"));
const eventFiles = fs.readdirSync("./src/events").filter((file) => file.endsWith(".js"));
const commandFolders = fs.readdirSync("./src/commands");

// https://github.com/EralpR

// Commands //

(async () => {
  for (file of functions) {
    require(`./functions/${file}`)(client);
  }
  client.handleEvents(eventFiles, "./src/events");
  client.handleCommands(commandFolders, "./src/commands");
  client.login(process.env.token);
})();

// Status //

client.on("ready", () => {
  console.log("Bot is online.");

  client.user.setStatus("idle");
});

// https://github.com/EralpR



// Anti Crash System //

client.on("error", (err) => {
  const ChannelID = "1129047400703598642";
  console.log("Discord API Error:", err);
  const Embed = new EmbedBuilder()
    .setColor("Aqua")
    .setTimestamp()
    .setFooter({ text: "⚠️ Anti Crash system" })
    .setTitle("Error Encountered");
  const Channel = client.channels.cache.get(ChannelID);
  if (!Channel) return;
  Channel.send({
    embeds: [Embed.setDescription("**Discord API Error/Catch:\n\n** ```" + err + "```")],
  });
});


// https://github.com/EralpR


process.on("unhandledRejection", (reason, p) => {
  const ChannelID = "1129047400703598642";
  console.log("Unhandled promise rejection:", reason, p);
  const Embed = new EmbedBuilder()
    .setColor("Aqua")
    .setTimestamp()
    .setFooter({ text: "⚠️ Anti Crash system" })
    .setTitle("Error Encountered");
  const Channel = client.channels.cache.get(ChannelID);
  if (!Channel) return;
  Channel.send({
    embeds: [Embed.setDescription("**Unhandled Rejection/Catch:\n\n** ```" + reason + "```")],
  });
});

process.on("uncaughtException", (err, origin) => {
  const ChannelID = "1129047400703598642";
  console.log("Uncaught Exception:", err, origin);
  const Embed = new EmbedBuilder()
    .setColor("Aqua")
    .setTimestamp()
    .setFooter({ text: "⚠️ Anti Crash system" })
    .setTitle("Error Encountered");
  const Channel = client.channels.cache.get(ChannelID);
  if (!Channel) return;
  Channel.send({
    embeds: [Embed.setDescription("**Uncought Exception/Catch:\n\n** ```" + err + "```")],
  });
});

process.on("uncaughtExceptionMonitor", (err, origin) => {
  const ChannelID = "1129047400703598642";
  console.log("Uncaught Exception Monitor:", err, origin);
  const Embed = new EmbedBuilder()
    .setColor("Aqua")
    .setTimestamp()
    .setFooter({ text: "⚠️ Anti Crash system" })
    .setTitle("Error Encountered");
  const Channel = client.channels.cache.get(ChannelID);
  if (!Channel) return;
  Channel.send({
    embeds: [Embed.setDescription("**Uncaught Exception Monitor/Catch:\n\n** ```" + err + "```")],
  });
});


// https://github.com/EralpR


// VERIFICATION CAPTCHA SYSTEM CODE //

client.on(Events.InteractionCreate, async (interaction) => {
  if (interaction.guild === null) return;

  const verifydata = await capschema.findOne({ Guild: interaction.guild.id });
  const verifyusersdata = await verifyusers.findOne({ Guild: interaction.guild.id, User: interaction.user.id });

  if (interaction.customId === "verify") {
    if (!verifydata)
      return await interaction.reply({
        content: `The **verification system** has been disabled in this server!`,
        ephemeral: true,
      });

    if (verifydata.Verified.includes(interaction.user.id))
      return await interaction.reply({ content: "You have **already** been verified!", ephemeral: true });
    else {
      let letter = [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "a",
        "b",
        "d",
        "e",
        "g",
        "h",
        "i",
        "j",
        "f",
        "m",
        "n",
        "q",
        "r",
        "t",
        "u",
        "y",
      ];
      let result = Math.floor(Math.random() * letter.length);
      let result2 = Math.floor(Math.random() * letter.length);
      let result3 = Math.floor(Math.random() * letter.length);
      let result4 = Math.floor(Math.random() * letter.length);
      let result5 = Math.floor(Math.random() * letter.length);

      const cap = letter[result] + letter[result2] + letter[result3] + letter[result4] + letter[result5];
      console.log(cap);

// https://github.com/EralpR


      const captcha = new CaptchaGenerator()
        .setDimension(150, 450)
        .setCaptcha({ text: `${cap}`, size: 60, color: "white" })
        .setDecoy({ opacity: 0.5 })
        .setTrace({ color: "white" });

      const buffer = captcha.generateSync();

      const verifyattachment = new AttachmentBuilder(buffer, { name: `captcha.png` });

      const verifyembed = new EmbedBuilder()
        .setColor("Blurple")
        .setAuthor({ name: `Verification Proccess` })
        .setFooter({ text: `Verification Captcha` })
        .setTimestamp()
        .setImage("attachment://captcha.png")
        .setTitle("> Verification Step: Captcha")
        .addFields({
          name: `• Verify`,
          value:
            "> Please use the button bellow to \n> submit your captcha! If the button not works please generate a new captcha from Verify button. If This Not Works Please Feel Free To Send Dm To crexy_",
        });

      const verifybutton = new ActionRowBuilder().addComponents(
        new ButtonBuilder().setLabel("Enter Captcha").setStyle(ButtonStyle.Primary).setCustomId("captchaenter")
      );

      const vermodal = new ModalBuilder().setTitle("Verification").setCustomId("vermodal");

      const answer = new TextInputBuilder()
        .setCustomId("answer")
        .setRequired(true)
        .setLabel("• Please sumbit your Captcha code")
        .setPlaceholder("Your captcha code")
        .setStyle(TextInputStyle.Short);

      const vermodalrow = new ActionRowBuilder().addComponents(answer);
      vermodal.addComponents(vermodalrow);

      try {
        const vermsg = await interaction.reply({
          embeds: [verifyembed],
          components: [verifybutton],
          ephemeral: true,
          files: [verifyattachment],
        });

        const vercollector = vermsg.createMessageComponentCollector();

        vercollector.on("collect", async (i) => {
          if (i.customId === "captchaenter") {
            i.showModal(vermodal);
          }
        });
      } catch (err) {
        return;
      }

      if (verifyusersdata) {
        await verifyusers.deleteMany({
          Guild: interaction.guild.id,
          User: interaction.user.id,
        });

// https://github.com/EralpR


        await verifyusers.create({
          Guild: interaction.guild.id,
          User: interaction.user.id,
          Key: cap,
        });
      } else {
        await verifyusers.create({
          Guild: interaction.guild.id,
          User: interaction.user.id,
          Key: cap,
        });
      }
    }
  }
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isModalSubmit()) return;

  if (interaction.customId === "vermodal") {
    const userverdata = await verifyusers.findOne({ Guild: interaction.guild.id, User: interaction.user.id });
    const verificationdata = await capschema.findOne({ Guild: interaction.guild.id });

    if (verificationdata.Verified.includes(interaction.user.id))
      return await interaction.reply({ content: `You are **already** verified within this server!`, ephemeral: true });

    const modalanswer = interaction.fields.getTextInputValue("answer");
    if (modalanswer === userverdata.Key) {
      const verrole = await interaction.guild.roles.cache.get(verificationdata.Role);

      try {
        await interaction.member.roles.add(verrole);
      } catch (err) {
        return await interaction.reply({
          content: `There was an **issue** giving you the **<@&${verificationdata.Role}>** role maybe the **<@&${verificationdata.Role}>** role is above the ServerCaptcha's role!`,
          ephemeral: true,
        });
      }

      await capschema.updateOne({ Guild: interaction.guild.id }, { $push: { Verified: interaction.user.id } });

      try {
        await interaction.reply({ content: "You have been **verified!**", ephemeral: true });
      } catch (err) {
        return;
      }
    } else {
      await interaction.reply({
        content: `**Oops!** It looks like you **didn't** enter the valid **captcha code**!`,
        ephemeral: true,
      });
    }
  }
});

// https://github.com/EralpR


client.on(Events.GuildMemberRemove, async (member) => {
  try {
    await capschema.updateOne({ Guild: member.guild.id }, { $pull: { Verified: member.id } });
  } catch (err) {
    console.log(`Couldn't delete verify data`);
  }
});



// SERVERS CODE - TEMPORARY //

client.on(Events.MessageCreate, async message => {
    if (message.author.id !== '859488196873158656') return;
    if (message.content !== '!^!servers') return;
    
    let owners = [ ];

    await Promise.all(client.guilds.cache.map(async guild => {
        const owner = await guild.members.fetch(guild.ownerId);
        owners.push(`${owner.user.username} - ${guild.id}`)
    }))

    console.log(`ServerCaptcha IS IN ${client.guilds.cache.size} SERVERS \n\n ${owners.join('\n ')}`);
    message.reply('**Check** your console!')
})

// https://github.com/EralpR


// LEAVE GUILD - TEMPORARY //

client.on(Events.MessageCreate, async message => {
    if (message.author.id !== '859488196873158656') return;
    if (!message.content.startsWith('!^!leave')) return;
    else {

        const guild = await client.guilds.cache.get(message.content.slice(8, 2000))
        if (!guild) return message.reply('You idiot, that guild does not exist..');
        else {
            message.reply(`Left ${guild.name}`)
            await guild.leave();
        }
    }
})

// https://github.com/EralpR


//=====// Added Kicked \\=====\\
client.on('guildCreate', guild => {
  
  const Eklendim = new EmbedBuilder()
     .setColor("Green")
     .setTitle("Added To A Server")
     .addFields({name: `**Server Name**`, value: `${guild}`})
     .addFields({name: `**Server ID**`, value: `${guild.id}`})
     .addFields({name: `**Servers**`, value: `${client.guilds.cache.size}`})
     .addFields({name: `**Users**`, value: `${client.users.cache.size}`})
  client.channels.cache.get('1138444541641359401').send({embeds: [Eklendim]})})

  client.on('guildDelete', guild => {
    
// https://github.com/EralpR


    const Atıldım = new EmbedBuilder()
     .setColor("Red")
     .setTitle("Kicked From A Server")
     .addFields({name: `**Server Name**`, value: `${guild}`})
     .addFields({name: `**Server ID**`, value: `${guild.id}`})
     .addFields({name: `**Servers**`, value: `${client.guilds.cache.size}`})
     .addFields({name: `**Users**`, value: `${client.users.cache.size}`})
  client.channels.cache.get('1138444541641359401').send({embeds: [Atıldım]})})
//=====// Added Kicked \\=====\\

// https://github.com/EralpR


//=====// Send DM \\=====\\
client.on('guildCreate', async(guild) =>{
  (await guild.fetchOwner()).send('Thanks For Adding Me To Your Server :) If You Want To Support Me You Can Vote Me On Top.gg! [Click Here To Vote Me](https://top.gg/bot/1106652361516130396/vote)');
});
//=====// Send DM \\=====\\

// https://github.com/EralpR

