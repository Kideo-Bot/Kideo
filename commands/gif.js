const Command = require("../structures/Command");

const { Message, MessageEmbed } = require("discord.js");

module.exports = new Command(async (message, args, client) => {

    if(args.length < 2){
        message.reply({embeds: [new MessageEmbed().setTitle("**Missing arguments**").setDescription("You must add the name of the gif you want")]});
        return;
    }

    let name = "";

    args.forEach(arg => {
        if(arg !== args[0]){
            name+=arg + "+";
        }
    })

    const url = await client.KideoApi.getGifWithName(name);

    if(url === undefined){
        let gifName = "";
        name.split("+").forEach(arg => {
            gifName+=arg + " ";
        })
        message.reply({embeds: [new MessageEmbed().setTitle("**Bad arguments**").setDescription("We can't find a gif with the name **" + gifName + "** :/").setColor(client.color.RED)]});
        return;
    }

    message.reply(url);

}, ["all"], "This command allow you to have a gif with the name you think");