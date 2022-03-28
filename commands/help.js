const Command = require("../structures/Command");

const { Message, MessageEmbed } = require("discord.js");

module.exports = new Command((message, args, client) => {

    let embedMessage = "";

    client.command.forEach(command => {
        embedMessage += `**${command.name}**: ${command.description}\n\n`;
    });

    const embed = new MessageEmbed().setTitle("**Help**").setDescription(embedMessage);

    message.reply({embeds: [embed]});

}, ["all"], "This command will give you the list of all registered commands!");