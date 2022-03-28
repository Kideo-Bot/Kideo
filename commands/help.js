const Command = require("../structures/Command");

const { Message, MessageEmbed } = require("discord.js");

module.exports = new Command((message, args, client) => {

    let embedMessage = "";

    client.command.forEach(command => {
        embedMessage += `**${client.config.prefix}${command.name}**: ${command.description}\n\n`;
    });

    const embed = new MessageEmbed().setTitle("**Help**").setDescription(embedMessage).setColor(client.color.TRANSPARENT).setFooter({text: "All rigths reserved Kideo - 2022 ©", iconURL: "https://www.usine-digitale.fr/mediatheque/5/0/0/000305005_homePageUne/logo-google-g.jpg"});

    message.reply({embeds: [embed]});

}, ["all"], "This command will give you the list of all registered commands!");