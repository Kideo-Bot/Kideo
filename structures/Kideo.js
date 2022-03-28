const { Intents, Client, MessageEmbed} = require("discord.js");

const config = require("../config.json");

const fs = require("fs");

const Command = require("./Command");

const Color = require("./Color");

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

        this.color = Color;

        /**
         * @type {Map<string, Command>}
         */
        this.command = new Map();
    }

    start(){

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

        this.on("ready", () => {
            console.log("Kideo is ready !");
        });

        this.on("messageCreate", message => {

            if(message.author.bot) return;

            if(!message.content.startsWith(config.prefix)) return;

            const args = message.content.substring(config.prefix.length).split(/ +/);

            const command = this.command.get(args[0]);

            if(!command){
                embed = new MessageEmbed().setTitle("**Wrong command**").setDescription(`The command **${config.prefix}${args[0]}** doesn't exist !`).setColor(Color.RED);
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
                message.reply();
                return;
            }

            command.run(message, args, this);

        });

        this.login(config.token);
    }

}

module.exports = Kideo;