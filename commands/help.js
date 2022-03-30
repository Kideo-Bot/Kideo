const Command = require("../structures/Command");

const { Message, MessageEmbed } = require("discord.js");

module.exports = new Command((message, args, client) => {

    let embedMessage = "";

    client.command.forEach(command => {
        embedMessage += `**${client.prefix}${command.name}**: ${command.description}\n\n`;
    });

    const embed = new MessageEmbed().setTitle("**Help**").setDescription(embedMessage).setColor(client.color.TRANSPARENT).setFooter({text: "Kideo - 2022", iconURL: client.user.icon_url});

    message.reply({embeds: [embed]});

}, ["all"], "This command will give you the list of all registered commands!");