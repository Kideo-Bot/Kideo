const Command = require("../structures/Command");

const { Message, MessageEmbed, Permissions } = require("discord.js");

module.exports = new Command(async (message, args, client) => {

    const member = await message.guild.members.fetch(message.author.id);

    if(!member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)){
        return await message.reply({embeds: [new MessageEmbed().setTitle("**Missing Permissions**").setDescription("You haven't got the permission: **MANAGE_MESSAGES**").setColor(client.color.RED).setFooter({text: "Kideo - 2022"})]});
    }

    if(args.length < 2){
        return await message.reply({embeds: [new MessageEmbed().setTitle("**Missing arguments**").setDescription("You have to add the person and the reason").setColor(client.color.RED).setFooter({text: "Kideo - 2022"})]});
    }

    if(message.mentions.members.size === 0){
        return await message.reply({embeds: [new MessageEmbed().setTitle("**Missing arguments**").setDescription("You have to add the person who will be unmuted").setColor(client.color.RED).setFooter({text: "Kideo - 2022"})]})
    }

    const target = message.mentions.members.first();

    const roleMute = target.roles.cache.find(role => role.name === "Muted");

    if(roleMute === undefined){
        return await message.reply({embeds: [new MessageEmbed().setTitle("**Bad member**").setDescription("This member isn't mute").setColor(client.color.RED).setFooter({text: "Kideo - 2022"})]});
    }

    target.roles.remove(roleMute).then(async () => {
        target.send({embeds: [new MessageEmbed().setTitle("**You are unmuted**").setDescription("You are unmuted in the server: **" + message.guild.name + "** !").setColor(client.color.TENNISBALL).setFooter({text: "Kideo - 2022"})]}).then(() => {
            message.reply({embeds: [new MessageEmbed().setTitle("**Command succeed**").setDescription(`The member <@${target.id}> has been unmuted ! :D`).setColor(client.color.TENNISBALL).setFooter({text: "Kideo - 2022"})]})
        })
    }).catch(err => {
        message.reply({embeds: [new MessageEmbed().setTitle("**I haven't permissions**").setDescription("I have to have the permission: **MANAGE_ROLES**").setColor(client.color.RED).setFooter({text: "Kideo - 2022"})]})
    })

}, ["all"], "This command will unmute the person you want");