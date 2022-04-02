const Command = require("../structures/Command");

const { Message, MessageEmbed } = require("discord.js");

const KideoAPI = require("../structures/KideoAPI.js");

const api = new KideoAPI();

module.exports = new Command(async (message, args, client) => {

    const level = await api.getLevel(message.guildId);
    const exp = await api.getExperience(message.guildId);

    await message.reply(
        {
            embeds: [
            new MessageEmbed().setTitle("**Server Statistics**").setDescription(`Level: ${level}\nExperience: ${exp}`).setFooter("Kideo - 2022")
            ]
        }
    );

}, ["all"], "Commande d'exemple");