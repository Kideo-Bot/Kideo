const Kideo = require("./structures/Kideo");
const {MessageEmbed} = require("discord.js");

const client = new Kideo();

// Kideo Discord Server

client.on("messageReactionAdd", async (reaction, user) => {

    if(reaction.message.guild.id !== "958047152930701342") return;

    if(reaction.emoji.name === "✅" && reaction.message.channel.id === "958782048812793909"){
        const member = await reaction.message.guild.members.fetch(user.id);

        await member.roles.add("958781509228199986");
    }

})

client.on("messageReactionRemove", async (reaction, user) => {

    if(reaction.message.guild.id !== "958047152930701342") return;

    if(reaction.emoji.name === "✅" && reaction.message.channel.id === "958782048812793909"){
        const member = await reaction.message.guild.members.fetch(user.id);

        await member.roles.remove("958781509228199986");
    }

})

client.on("guildMemberAdd", async member => {

    if(member.guild.id !== "958047152930701342") return;

    const channel = await member.guild.channels.fetch("962811439326822490");

    channel.send({embeds: [new MessageEmbed().setTitle("**Welcome**").setDescription("A new member is comming !\n\nWelcome <@!" + member.id + "> :)").setColor(client.color.TENNISBALL)]});

})

client.start();