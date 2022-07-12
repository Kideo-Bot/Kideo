const Command = require("../structures/Command");

const { Message, MessageEmbed } = require("discord.js");

module.exports = new Command(async (message, args, client) => {

    const dogURL = await client.KideoApi.getDogURL();

    message.reply({embeds: [new MessageEmbed().setTitle("**DOG**   🐶").setImage(dogURL).setColor("DARK_VIVID_PINK").setFooter({text: "Kideo - 2022"})]});

}, ["all"], "This command allow you to have a cute dog (or not IDK lmao) (https://dog.ceo/dog-api)");