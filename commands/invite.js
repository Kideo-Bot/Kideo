const Command = require("../structures/Command");

const { Message, MessageEmbed, Invite} = require("discord.js");

module.exports = new Command(async (message, args, client) => {

    const inviteLink = await message.guild.systemChannel.createInvite({
        maxAge: 0,
        maxUses: 0,
        temporary: false
    });

    message.reply(`Here is the invite link bill boy! ${inviteLink}`);



}, ["all"], "Invite someone has never been easier than with that command");