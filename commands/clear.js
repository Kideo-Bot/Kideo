const Command = require("../structures/Command");

const { Message, MessageEmbed, Permissions } = require("discord.js");

module.exports = new Command(async (message, args, client) => {

    const member = await message.guild.members.fetch(message.author.id);

    if(!member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)){
        return await message.reply({embeds: [new MessageEmbed().setTitle("**Missing permissions**").setDescription("You must have the permission **MANAGE_MESSAGES**").setColor(client.color.RED).setFooter({text: "Kideo - 2022"})]});
    }

    if(args.length < 2){
        message.reply({embeds: [new MessageEmbed().setTitle("**Missing arguments**").setDescription("You must add **how many messages** I will delete !").setColor(client.color.RED).setFooter({text: "Kideo - 2022"})]});
        return;
    }

    if(isNaN(args[1])){
        message.reply({embeds: [new MessageEmbed().setTitle("**Bad arguments**").setDescription("You must add an number and **not a sentence or a word**").setColor(client.color.RED).setFooter({text: "Kideo - 2022"})]});
        return;
    }

    const number = parseInt(args[1]);

    if(number > 100){
        message.reply({embeds: [new MessageEmbed().setTitle("**Bad arguments**").setDescription("You must put a number who is **not bigger than 100**").setColor(client.color.RED).setFooter({text: "Kideo - 2022"})]});
        return;
    }

    message.channel.bulkDelete(number + 1).then(async () => {
        const mes = await message.channel.send({embeds: [new MessageEmbed().setTitle("**Command succeed**").setDescription(`I removed **${number} messages**`).setColor(client.color.TENNISBALL).setFooter({text: "Kideo - 2022"})]})

        const messageID = mes.id;
        const channelID = mes.channel.id;
        const guildID = mes.guild.id;

        setTimeout(async () => {

            const guild = await client.guilds.fetch(guildID).catch(() => {});
            const channel = await guild.channels.fetch(channelID).catch(() => {});
            const deleteMessage = await channel.messages.fetch(messageID).catch(() => {});

            if(deleteMessage !== undefined){
                deleteMessage.delete();
            }

        }, 1000 * 5)

    }).catch(err => {
        message.channel.send({embeds: [new MessageEmbed().setTitle("**Command failed**").setDescription("There is an error when you have deleted messages :/").setFooter({text: "Kideo - 2022"})]});
    })

}, ["all"], "This command will allow you to delete messages in the channel");