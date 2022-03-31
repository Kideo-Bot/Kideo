const { Intents, Client, MessageEmbed, Message, GuildMember, Permissions} = require("discord.js");

const config = require("../config.json");

const KideoAPI = require("./KideoAPI");

const api = new KideoAPI();

const fs = require("fs");

const Command = require("./Command");

const Color = require("./Color");

/**
 * @param client {Kideo}
 * @param activity {string}
 */
function setActivities(client, activity){
    client.user.setActivity({
        type: "PLAYING",
        name: activity
    })
}

/**
 * @description This class allows you managing Kideo Bot
 * @return { Kideo }
 */
class Kideo extends Client {
    constructor() {
        const ints = new Intents().add(["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS", "GUILD_MESSAGE_REACTIONS"]);
        super({
            intents: ints,
            partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'GUILD_MEMBER', 'USER']
        });

        this.config = config;

        this.prefix = undefined;

        this.KideoApi = api;

        this.color = Color;

        /**
         * @type {Map<string, Command>}
         */
        this.command = new Map();
    }

    start(){

        const activties = [
            "make pasta",
            "manage your server",
            "do his homework",
            "Tetris Premium"
        ]

        let embed = undefined;

        fs.readdirSync("./commands").filter(file => file.endsWith(".js")).forEach(file => {
            /**
             * @type {Command}
             */
            const command = require(`../commands/${file}`);

            const name = file.split(".")[0];

            command.name = name;

            this.command.set(name, command);

            console.log(`La commande ${name} a bien été chargé !`);
        })

        this.on("ready", async () => {

            let number = Math.floor(Math.random() * activties.length);

            setActivities(this, activties[number]);

            setInterval(() => {

                const old = number;

                while (old === number){
                    number = Math.floor(Math.random() * activties.length);
                }

                setActivities(this, activties[number]);

            }, 1000 * 60 * 5);

            console.log("Kideo is ready !");
        });

        this.on("messageCreate", async message => {

            if(message.author.bot) return;

            if(await (await api.getDataWithID(message.guild.id)).message[0] === undefined){
                if(await api.createGuildSQL({ServerID: message.guild.id, XP: 1})){
                    console.log("Guild created");

                    const guild = await api.getDataWithID(message.guild.id);

                    this.prefix = guild.message[0].PREFIX;

                }else {
                    console.log("Error in the creation of the guild");
                    return;
                }
            }

            const guild = await api.getDataWithID(message.guild.id);

            this.prefix = guild.message[0].PREFIX;

            if(message.content === `<@!${this.user.id}>` || message.content === `<@${this.user.id}>`){
                return await message.reply({embeds: [new MessageEmbed().setTitle("**Prefix**").setDescription(`Hi !\n\nMy prefix is **${this.prefix}**`).setThumbnail("https://images.assetsdelivery.com/compings_v2/djvstock/djvstock1409/djvstock140901230.jpg")]});
            }

            if(!await api.addPointXpGuild(message.guildId)){
                console.log("Error on Xp Point");
                return;
            }

            if(!message.content.startsWith(this.prefix)) return;

            const args = message.content.substring(this.prefix.length).split(/ +/);

            const command = this.command.get(args[0]);

            if(!command){
                embed = new MessageEmbed().setTitle("**Wrong command**").setDescription(`The command **${this.prefix}${args[0]}** doesn't exist !`).setColor(Color.RED);
                message.reply({embeds: [embed]});
                return;
            }

            let canStart = false;

            command.permissions.forEach(perm => {
                if(perm === "all"){
                    canStart = true;
                }

                if(message.guild.roles.cache.has(perm)){
                    if(message.member.roles.cache.has(perm)){
                        canStart = true;
                    }
                }

            })

            if(!canStart){
                message.reply({embeds: [new MessageEmbed().setTitle("**Missing permissions**").setDescription("You don't have the permissions !").setColor(this.color.RED)]});
                return;
            }

            command.run(message, args, this);

        });

        this.on("guildCreate", async guild => {
            const channel = await guild.channels.cache.find(channel => channel.type === "GUILD_TEXT");
            const chan = await guild.channels.fetch(channel.id);
            if(await api.createGuildSQL({ServerID: guild.id, XP: 1})){
                console.log(`Data has been sent`);
            }else {
                console.log(`An error has current`)
            }
        })

        this.on("guildDelete", async guild => {
            console.log(guild.name);
            if(await api.clearGuildWithID({ServerID: guild.id})){
                console.log(`Data has been sent`);
            }else {
                console.log(`An error has current`)
            }
        })

        this.login(config.token);
    }

}

module.exports = Kideo;