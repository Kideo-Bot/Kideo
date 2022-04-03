const Command = require("../structures/Command");

const { Message, MessageEmbed } = require("discord.js");

const KideoAPI = require("../structures/KideoAPI.js");

module.exports = new Command(async (message, args, client) => {

    const level = await client.KideoApi.getLevel(message.guildId);
    const exp = await client.KideoApi.getExperience(message.guildId);

    await message.reply(
        {
            embeds: [
            new MessageEmbed().setTitle("**Server Statistics**").setDescription(`Level: ${level}\nExperience: ${exp}`).setFooter("Kideo - 2022")
            ]
        }
    );

}, ["all"], "Commande d'exemple");