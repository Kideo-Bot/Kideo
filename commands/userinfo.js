const Command = require("../structures/Command");

const { Message, MessageEmbed } = require("discord.js");

module.exports = new Command(async (message, args, client) => {

    if(message.mentions.members.size === 0){
        return await message.reply({embeds: [new MessageEmbed().setTitle("**Bad arguments**").setDescription("You have to add the person you want to see the statistics").setColor(client.color.RED).setFooter({text: "Kideo - 2022"})]})
    }

    const target = message.mentions.members.first();

    let request = await client.KideoApi.getWarnsUser(target.user.id, message.guild.id);

    let warns = 0;

    if(request.succeed !== false){
        warns = request.message;
    }

    const imageURL = target.user.displayAvatarURL({format: "png"});

    message.reply({embeds: [new MessageEmbed().setTitle("**" + target.user.username.toUpperCase() + "**").setDescription(`Username: **${target.user.username}**\nImageURL: ${imageURL}\nNumber of warns: **${warns}**`).setFooter({iconURL: imageURL, text: "Kideo - 2022"}).setColor(client.color.TENNISBALL)]});

}, ["all"], "It just tells you some informations about a user. Nothing else...");