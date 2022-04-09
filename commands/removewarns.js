const Command = require("../structures/Command");

const { Message, MessageEmbed, Permissions} = require("discord.js");

module.exports = new Command(async (message, args, client) => {

    const member = await message.guild.members.fetch(message.author.id);

    if(!member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)){
        return await message.reply({embeds: [new MessageEmbed().setTitle("**Missing Permissions**").setDescription("You haven't got the permission: **MANAGE_MESSAGES**").setColor(client.color.RED).setFooter({text: "Kideo - 2022"})]});
    }

    if(message.mentions.members.size === 0){
        return await message.reply({embeds: [new MessageEmbed().setTitle("**Bad Arguments**").setDescription("You have to mention the member who will unwarn !").setColor(client.color.RED).setFooter({text: "Kideo - 2022"})]});
    }

    const target = message.mentions.members.first();

    if(await (await client.KideoApi.getWarnsUser(target.user.id, message.guild.id)).succeed === false){
        return await message.reply({embeds: [new MessageEmbed().setTitle("**Not this people**").setDescription("This member doesn't have any warns").setColor(client.color.RED).setFooter({text: "Kideo - 2022"})]});
    }else {
        if(await client.KideoApi.deleteWarnUser(target.user.id, message.guild.id)){
            target.send({embeds: [new MessageEmbed().setTitle("**You are free now**").setDescription("Thanks to **" + message.author.username + "** you don't have warns in the server **" + member.guild.name  + "** !").setColor(client.color.TENNISBALL).setFooter({text: "Kideo - 2022"})]}).then(async () => {
                return await message.reply({embeds: [new MessageEmbed().setTitle("**Command succeed**").setDescription(`Now, The member <@${target.user.id}> doesn't have warns`).setColor(client.color.TENNISBALL).setFooter({text: "Kideo - 2022"})]})
            })
        }
    }

}, ["all"], "Relax, it just removes warns from people");