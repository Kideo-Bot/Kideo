const Command = require("../structures/Command");

const { Message, MessageEmbed, Permissions } = require("discord.js");

module.exports = new Command(async (message, args, client) => {

    const member = await message.guild.members.fetch(message.author.id);

    if(!member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)){
        return await message.reply({embeds: [new MessageEmbed().setTitle("**Missing Permissions**").setDescription("You haven't got the permission: **BAN_MEMBERS**").setColor(client.color.RED)]});
    }

    if(args.length < 3){
        return await message.reply({embeds: [new MessageEmbed().setTitle("**Missing arguments**").setDescription("You have to add the person and the reason").setColor(client.color.RED)]});
    }

    if(message.mentions.members.size === 0){
        return await message.reply({embeds: [new MessageEmbed().setTitle("**Missing arguments**").setDescription("You have to add the person who will be banned").setColor(client.color.RED)]})
    }

    const target = message.mentions.members.first();

    if(target.permissions.has(Permissions.FLAGS.BAN_MEMBERS)){
        return await message.reply({embeds: [new MessageEmbed().setTitle("**You can't do this**").setDescription("This member is a moderator, **you can't ban** him/her").setColor(client.color.RED)]})
    }

    let reason = "";

    let i = 2;

    for (i;i<args.length;i++){
        reason+=args[i] + " ";
    }

    target.send({embeds: [new MessageEmbed().setTitle("**You're banned**").setDescription("You are banned from the server **" + message.guild.name + "** for the reason: **" + reason + "**").setColor(client.color.RED)]}).then(() => {
        target.ban({reason: reason}).then(async userBanned => {
            await message.reply({embeds: [new MessageEmbed().setTitle("**Command succeed**").setDescription(`The member **${target.user.username}** has been banned to the server for the reason: **${reason}**`).setColor(client.color.TENNISBALL)]});
        })
    })

}, ["all"], "This command will ban the person you want");