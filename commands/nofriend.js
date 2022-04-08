const Command = require("../structures/Command");

const { Message, MessageEmbed } = require("discord.js");

module.exports = new Command(async (message, args, client) => {

    if(args.length < 2){
        message.reply({embeds: [new MessageEmbed().setTitle("**Missing arguments**").setDescription("You must add a start of **sentence** !").setFooter({text: "Kideo - 2022"})]});
        return;
    }

    let sentence = "";

    args.forEach(arg => {
        if(arg !== args[0]){
            sentence+=arg + " ";
        }
    })

    const waitMessage = await message.reply({embeds: [new MessageEmbed().setTitle("**Your order is preparing**").setDescription("Please wait :)").setFooter({text: "Kideo - 2022"})]});

    const response = await client.KideoApi.talkWithOpenAI(sentence);

    if(response === ""){
        message.reply({embeds: [new MessageEmbed().setTitle("**Command failed**").setDescription("The API of openAI not worked, we don't know why :/").setFooter({text: "Kideo - 2022"})]});
        return;
    }

    if(response.length > 2000){
        message.reply({embeds: [new MessageEmbed().setTitle("**The bot is speaking too much**").setDescription("The response is **bigger than 2000 characters**").setFooter({text: "Kideo - 2022"})]}).then(() => {
            waitMessage.delete();
        });
        return;
    }

    message.reply({embeds: [new MessageEmbed().setTitle("**Response**").setDescription(response).setColor(client.color.ORANGE).setFooter({text: "Kideo - 2022"})]}).then(() => {
        waitMessage.delete();
    });

}, ["all"], "This command is the best, you will talk with the bot ! :D");