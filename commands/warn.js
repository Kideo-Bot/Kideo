const Command = require("../structures/Command");

const { Message, MessageEmbed, Permissions } = require("discord.js");

module.exports = new Command(async (message, args, client) => {

    const member = await message.guild.members.fetch(message.author.id);

    if(!member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)){
        return await message.reply({embeds: [new MessageEmbed().setTitle("**Missing Permissions**").setDescription("You haven't got the permission: **MANAGE_MESSAGES**").setColor(client.color.RED).setFooter({text: "Kideo - 2022"})]});
    }

    if(args.length <= 2){
        return await message.reply({embeds: [new MessageEmbed().setTitle("**Missing Arguments**").setDescription("You have to add the person and the reason !").setColor(client.color.RED).setFooter({text: "Kideo - 2022"})]});
    }

    if(message.mentions.members.size === 0){
        return await message.reply({embeds: [new MessageEmbed().setTitle("**Bad Arguments**").setDescription("You have to mention the member who will warn !").setColor(client.color.RED).setFooter({text: "Kideo - 2022"})]});
    }

    const target = message.mentions.members.first();

    if(target.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)){
        return await message.reply({embeds: [new MessageEmbed().setTitle("**Bad member**").setDescription("You can't warn this member because he has the permission: **MANAGE_MESSAGES**").setColor(client.color.RED).setFooter({text: "Kideo - 2022"})]});
    }

    let reason = "";

    let i = 2;

    for (i;i<args.length;i++){
        if(i === args.length - 1){
            reason+=args[i];
        }else {
            reason+=args[i] + " ";
        }
    }

    let warns = await client.KideoApi.getWarnsUser(target.user.id, message.guild.id)

    if(warns.succeed === false){
        await client.KideoApi.createWarnUser(target.user.id, message.guild.id);
        target.send({embeds: [new MessageEmbed().setTitle("**You are warned**").setDescription("You are warned for in the server: **" + message.guild.name + "**\n the first time for the followed reason: **" + reason + "**").setColor(client.color.RED).setFooter({text: "Kideo - 2022"})]}).then(() => {
            message.reply({embeds: [new MessageEmbed().setTitle("**Command Succeed**").setDescription("You have warned <@" + target.id + "> for the first time for the reason: **" + reason + "**").setColor(client.color.TENNISBALL).setFooter({text: "Kideo - 2022"})]})
        })
        return;
    }

    warns = warns.message;

    if(warns >= 2){

        if(await client.KideoApi.deleteWarnUser(target.user.id, message.guild.id)){
            target.send({embeds: [new MessageEmbed().setTitle("**You are banned**").setDescription("You are banned in the server: **" + message.guild.name + "**\nBecause you had **3 warns**").setColor(client.color.RED).setFooter({text: "Kideo - 2022"})]}).then(() => {
                target.ban({reason: "Too many warns"}).then(() => {
                    message.reply({embeds: [new MessageEmbed().setTitle("**Command Succeed**").setDescription(`The member **__${target.user.username}__** has been banned because **he had 3 warns**`).setColor(client.color.TENNISBALL).setFooter({text: "Kideo - 2022"})]})
                })
            })
        }else {
            console.log("Problem")
        }

        return;
    }

    if(await client.KideoApi.setWarnsUser(target.user.id, warns + 1, message.guild.id)){
        target.send({embeds: [new MessageEmbed().setTitle("**You are warned**").setDescription("You are warned in the server: **" + message.guild.name + "**\n for the followed reason: **" + reason + "**\nIf you get another warn you will be banned !").setColor(client.color.RED).setFooter({text: "Kideo - 2022"})]}).then(() => {
            message.reply({embeds: [new MessageEmbed().setTitle("**Command succeed**").setDescription("You have warned <@" + target.id + "> for the reason: **" + reason + "**\nIf you get another warn you will be banned !").setColor(client.color.TENNISBALL).setFooter({text: "Kideo - 2022"})]});
        })
    }

}, ["all"], "Commande d'exemple");