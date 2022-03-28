const { Message } = require("discord.js");

const Kideo = require("./Kideo");

/***
 *
 * @param message {Message}
 * @param args {string[]}
 * @param client {Kideo}
 */
function runFunction(message, args, client){}

class Command {
    /**
     *
     * @param run {runFunction}
     * @param permissions {string[]}
     * @param description {string}
     */
    constructor(run, permissions, description) {
        this.run = run;
        this.permissions = permissions;
        this.description = description;
        this.name = "";
    }

}

module.exports = Command;