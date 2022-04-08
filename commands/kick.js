const Command = require("../structures/Command");

const { Message, MessageEmbed, Permissions } = require("discord.js");

module.exports = new Command(async (message, args, client) => {

    const member = await message.guild.members.fetch(message.author.id);

    if(!member.permissions.has(Permissions.FLAGS.KICK_MEMBERS)){
        return await message.reply({embeds: [new MessageEmbed().setTitle("**Missing Permissions**").setDescription("You haven't got the permission: **KICK_MEMBERS**").setColor(client.color.RED).setFooter({text: "Kideo - 2022"})]});
    }

    if(args.length < 3){
        return await message.reply({embeds: [new MessageEmbed().setTitle("**Missing arguments**").setDescription("You have to add the person and the reason").setColor(client.color.RED).setFooter({text: "Kideo - 2022"})]});
    }

    if(message.mentions.members.size === 0){
        return await message.reply({embeds: [new MessageEmbed().setTitle("**Missing arguments**").setDescription("You have to add the person who will be kicked").setColor(client.color.RED).setFooter({text: "Kideo - 2022"})]})
    }

    const target = message.mentions.members.first();

    if(target.permissions.has(Permissions.FLAGS.KICK_MEMBERS)){
        return await message.reply({embeds: [new MessageEmbed().setTitle("**You can't do this**").setDescription("This member is a moderator, **you can't kick** him/her").setColor(client.color.RED).setFooter({text: "Kideo - 2022"})]})
    }

    let reason = "";

    let i = 2;

    for (i;i<args.length;i++){
        reason+=args[i] + " ";
    }

    target.send({embeds: [new MessageEmbed().setTitle("**You are kicked**").setDescription("You are kicked in the server: **" + message.guild.name + "**\nFor the reason: **" + reason + "**").setColor(client.color.RED).setFooter({text: "Kideo - 2022"})]}).then(() => {
        target.kick(reason).then(() => {
            message.reply({embeds: [new MessageEmbed().setTitle("**Command succeed**").setDescription(`The member <@${target.id}> has been kicked for the reason: **${reason}**`).setColor(client.color.TENNISBALL).setFooter({text: "Kideo - 2022"})]})
        }).catch(err => {
            message.reply({embeds: [new MessageEmbed().setTitle("**I haven't permissions**").setDescription("I have to have the permission: **KICK_MEMBERS**").setColor(client.color.RED).setFooter({text: "Kideo - 2022"})]})
        })
    })

}, ["all"], "This command will mute the person you want");