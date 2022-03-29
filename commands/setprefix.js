const Command = require("../structures/Command");

const { Message, MessageEmbed } = require("discord.js");

module.exports = new Command(async (message, args, client) => {

    if(args.length <= 1){
        message.reply({embeds: [new MessageEmbed().setTitle("**Missing arguments**").setDescription("You must to add the new prefix")]});
        return;
    }

    const newPrefix = args[1];

    if(newPrefix.length > 1){
        message.reply({embeds: [new MessageEmbed().setTitle("**Prefix too long**").setDescription("The prefix can't be bigger than 1")]});
        return;
    }

    if(await client.KideoApi.changePrefixGuildID(newPrefix, message.guild.id)){
        message.reply({embeds: [new MessageEmbed().setTitle("**Success**").setDescription("The prefix has been changed to **" + newPrefix + "**").setColor(client.color.TENNISBALL)]})
    }else {
        message.reply({embeds: [new MessageEmbed().setTitle("**Failure**").setDescription("There is an error in the Kideo API").setColor(client.color.RED)]})
    }

}, ["all"], "Commande d'exemple");