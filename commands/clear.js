const Command = require("../structures/Command");

const { Message, MessageEmbed } = require("discord.js");

module.exports = new Command((message, args, client) => {

    if(args.length < 2){
        message.reply({embeds: [new MessageEmbed().setTitle("**Missing permissions**").setDescription("You must add **how many messages** I will delete !").setColor(client.color.RED)]});
        return;
    }

    if(isNaN(args[1])){
        message.reply({embeds: [new MessageEmbed().setTitle("**Bad arguments**").setDescription("You must add an number and **not a sentence or a word**").setColor(client.color.RED)]});
        return;
    }

    const number = parseInt(args[1]);

    if(number > 100){
        message.reply({embeds: [new MessageEmbed().setTitle("**Bad arguments**").setDescription("You must put a number who is **not bigger than 100**").setColor(client.color.RED)]});
        return;
    }

    message.channel.bulkDelete(number).then(() => {
        message.channel.send({embeds: [new MessageEmbed().setTitle("**Command succeed**").setDescription(`I removed **${number} messages**`).setColor(client.color.TENNISBALL)]})
    }).catch(err => {
        message.channel.send({embeds: [new MessageEmbed().setTitle("**Command failed**").setDescription("There is an error when you have deleted messages :/")]});
    })

}, ["all"], "This command will allow you to delete messages in the channel");