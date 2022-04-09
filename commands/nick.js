const Command = require("../structures/Command");

const Color = require("../structures/Color");

const { Message, MessageEmbed, Permissions} = require("discord.js");

module.exports = new Command(async (message, args, client) => {

    const member = await message.guild.members.fetch(message.author.id);
    const kideoRole = await message.guild.roles.cache.find(r => r.name == "Kideo");

    if(!kideoRole.permissions.has(Permissions.FLAGS.MANAGE_NICKNAMES)) {
        return await message.reply({embeds: [new MessageEmbed().setTitle("**Missing permissions**").setDescription("As I, Kideo don't have the **Manage Nicknames**/**Administrator** permission, I cannot change your username.").setFooter("Kideo - 2022").setColor(Color.RED)]});
    }

    if(!member.permissions.has(Permissions.FLAGS.CHANGE_NICKNAME)) {
        return await message.reply({embeds: [new MessageEmbed().setTitle("**Missing permissions**").setDescription("As you don't have the **Change Nickname** permission, I cannot change your username.").setFooter("Kideo - 2022").setColor(Color.RED)]});
    }

    if(args.length == 1) {
        return await message.reply({embeds: [new MessageEmbed().setTitle("**Missing arguments**").setDescription("You seriously want no name? Unfortunately I can't do  that for you, you have to choose a new nickname.").setFooter("Kideo - 2022").setColor(Color.RED)]});
    }

    let changed = true;

    if(args[1] === "clear" || args[1] === "reset" && args.length == 2) {
        return member.setNickname("").catch(async () => {
            changed = false;
        }).then(async () => {
            if(changed == false) {
                return await message.reply({embeds: [new MessageEmbed().setTitle("**I ain't higher than you** :sob:").setDescription("You're higher than the King (me) which is a problem. I can't reset change your username!").setFooter("Kideo - 2022").setColor(Color.RED)]});
            }
            return await message.reply({embeds: [new MessageEmbed().setTitle("**Nickname changed!**").setDescription(`Your beautiful nickname has been removed by your fantastic name!`).setColor(Color.TENNISBALL).setFooter("Kideo - 2022")]});
        })
    }

    let nickname = "";

    let i = 1;

    for (i;i<args.length;i++){
        if(i === args.length - 1) {
            nickname += args[i];
        } else {
            nickname += args[i] + " "
        }
    }

    const oldNickname = member.nickname != null ? member.nickname : member.user.username;

    if(nickname.length > 32) {
        return message.reply({embeds: [new MessageEmbed().setTitle("**Too much characters!**").setDescription("The maximum length for a nickname is **32 characters**").setFooter("Kideo - 2022").setColor(Color.RED)]})
    }

    member.setNickname(nickname).catch(async () => {
        changed = false;
    }).then(async () => {
        if(changed == false) {
            return await message.reply({embeds: [new MessageEmbed().setTitle("**I ain't higher than you** :sob:").setDescription("You're higher than the King (me) which is a problem. I can't even change your username!").setFooter("Kideo - 2022").setColor(Color.RED)]});
        }
        return await message.reply({embeds: [new MessageEmbed().setTitle("**Nickname changed!**").setDescription(`Your old and scary nickname \`${oldNickname}\` has been changed by this new and beautiful nickname \`${nickname}\``).setColor(Color.TENNISBALL).setFooter("Kideo - 2022")]});
    })

}, ["all"], "Change your own nickname for more style");