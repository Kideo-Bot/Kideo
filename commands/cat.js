const Command = require("../structures/Command");

const { Message, MessageEmbed } = require("discord.js");

module.exports = new Command(async (message, args, client) => {

    const catURL = await client.KideoApi.getCatURL();

    message.reply({embeds: [new MessageEmbed().setTitle("**CAT**   😺").setImage(catURL).setColor("DARK_VIVID_PINK").setFooter({text: "Kideo - 2022"})]});

}, ["all"], "This command allow you to send a funny cat (https://thecatapi.com)");