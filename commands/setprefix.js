const Command = require("../structures/Command");

const { Message, MessageEmbed, Permissions } = require("discord.js");

module.exports = new Command(async (message, args, client) => {

    const member = await message.guild.members.fetch(message.author.id);

    if(!member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)){
        return await message.reply({embeds: [new MessageEmbed().setTitle("**Missing permissions**").setDescription("You must have the permission **ADMINISTRATOR**").setColor(client.color.RED).setFooter({text: "Kideo - 2022"})]});
    }

    if(args.length <= 1){
        message.reply({embeds: [new MessageEmbed().setTitle("**Missing arguments**").setDescription("You must to add the new prefix").setFooter({text: "Kideo - 2022"})]});
        return;
    }

    const newPrefix = args[1];

    if(newPrefix.length > 2){
        message.reply({embeds: [new MessageEmbed().setTitle("**Prefix too long**").setDescription("The prefix can't be **bigger than 2**").setFooter({text: "Kideo - 2022"})]});
        return;
    }

    if(await client.KideoApi.changePrefixGuildID(newPrefix, message.guild.id)){
        message.reply({embeds: [new MessageEmbed().setTitle("**Success**").setDescription("The prefix has been changed to **" + newPrefix + "**").setColor(client.color.TENNISBALL).setFooter({text: "Kideo - 2022"})]})
    }else {
        message.reply({embeds: [new MessageEmbed().setTitle("**Failure**").setDescription("There is an error in the Kideo API").setColor(client.color.RED).setFooter({text: "Kideo - 2022"})]})
    }

}, ["all"], "This command will allow you to change the prefix of the bot");