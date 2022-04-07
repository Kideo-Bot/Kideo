const Command = require("../structures/Command");

const { Message, MessageEmbed, Permissions } = require("discord.js");

module.exports = new Command(async (message, args, client) => {

    const member = await message.guild.members.fetch(message.author.id);

    if(!member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)){
        return await message.reply({embeds: [new MessageEmbed().setTitle("**Missing Permissions**").setDescription("You haven't got the permission: **MANAGE_MESSAGES**").setColor(client.color.RED)]});
    }

    if(args.length < 3){
        return await message.reply({embeds: [new MessageEmbed().setTitle("**Missing arguments**").setDescription("You have to add the person and the reason").setColor(client.color.RED)]});
    }

    if(message.mentions.members.size === 0){
        return await message.reply({embeds: [new MessageEmbed().setTitle("**Missing arguments**").setDescription("You have to add the person who will be muted").setColor(client.color.RED)]})
    }

    const target = message.mentions.members.first();

    if(target.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)){
        return await message.reply({embeds: [new MessageEmbed().setTitle("**You can't do this**").setDescription("This member is a moderator, **you can't mute** him/her").setColor(client.color.RED)]})
    }

    let reason = "";

    let i = 2;

    for (i;i<args.length;i++){
        reason+=args[i] + " ";
    }

    let muteRole = member.guild.roles.cache.find(role => role.name === "Muted");

    if(muteRole === undefined){
        muteRole = await member.guild.roles.create({
            name: "Muted"
        })

        message.guild.channels.cache.forEach(channel => {
            channel.permissionOverwrites.set([
                {
                    id: muteRole.id,
                    deny: ['SEND_MESSAGES']
                }
            ]);
        })
    }

    if(target.roles.cache.has(muteRole.id)){
        return await message.reply({embeds: [new MessageEmbed().setTitle("**Wrong user**").setDescription("This user is already muted").setColor(client.color.RED)]});
    }

    target.roles.add(muteRole).then(() => {
        target.send({embeds: [new MessageEmbed().setTitle("**You are muted**").setDescription("You are muted in the server: **" + message.guild.name + "**\nFor the reason: **" + reason + "**").setColor(client.color.RED)]}).then(() => {
            message.reply({embeds: [new MessageEmbed().setTitle("**Command succeed**").setDescription(`The member <@${target.id}> has been muted for the reason: **${reason}**`).setColor(client.color.TENNISBALL)]})
        })
    });

}, ["all"], "This command will mute the person you want");