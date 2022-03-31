const Command = require("../structures/Command");

const { Message, MessageEmbed } = require("discord.js");

module.exports = new Command(async (message, args, client) => {

    if(message.mentions.members.size >= 1){
        const iconURL = message.mentions.members.first().displayAvatarURL({format: "png"});

        const embed = new MessageEmbed().setImage(iconURL + "?size=2048").setColor(client.color.TENNISBALL).setAuthor({iconURL: message.author.displayAvatarURL({format: "png"}), name: message.author.tag}).setTitle("**Avatar**");

        message.reply({embeds: [embed]});
        return;
    }

    const iconURL = message.author.displayAvatarURL({format: "png"});

    const embed = new MessageEmbed().setImage(iconURL + "?size=2048").setColor(client.color.TENNISBALL).setAuthor({iconURL: iconURL, name: message.author.tag}).setTitle("**Avatar**");

    message.reply({embeds: [embed]});

}, ["all"], "This command will allow you to get your avatar ;D");