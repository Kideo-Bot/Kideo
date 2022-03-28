const Command = require("../structures/Command");

const { Message, MessageEmbed } = require("discord.js");

module.exports = new Command((message, args, client) => {

    let number = 0;

    const interval = setInterval(() => {
        number++;
    }, 1);

    let embed = new MessageEmbed().setTitle("**Pong**").setDescription("Pong!").setColor(client.color.TENNISBALL);

    message.reply({embeds: [embed]}).then(message => {
        clearInterval(interval);
        embed = new MessageEmbed().setTitle("**Pong**").setDescription(`Pong! Your ping is **${number}ms!**`).setColor(client.color.TENNISBALL);
        message.edit({embeds: [embed]});
    });

}, ["all"], "This command allows you knowing if the bot is online");