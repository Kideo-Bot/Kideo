const Command = require("../structures/Command");

const { Message, MessageEmbed } = require("discord.js");

module.exports = new Command((message, args, client) => {

    message.reply("Pong !");

}, ["910499512085278760"], "Cette commande permet de savoir si le bot fonctionne correctement");