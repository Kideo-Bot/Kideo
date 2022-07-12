const Command = require("../structures/Command");

const { Message, MessageEmbed } = require("discord.js");

module.exports = new Command(async (message, args, client) => {

    message.reply({embeds: [await client.KideoApi.getNetflixSeriesOrFilmAPI()]});

}, ["all"], "You will have a random Netflix series or movie");