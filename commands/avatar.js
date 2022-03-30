const Command = require("../structures/Command");

const { Message, MessageEmbed } = require("discord.js");

module.exports = new Command((message, args, client) => {

    const iconURL = message.author.displayAvatarURL({format: "png"});

    const embed = new MessageEmbed().setImage(iconURL + "?size=2048").setColor(client.color.TENNISBALL).setAuthor({iconURL: iconURL, name: message.author.tag}).setTitle("**Avatar**");

    message.reply({embeds: [embed]});

}, ["all"], "This command will allow you to get your avatar ;D");