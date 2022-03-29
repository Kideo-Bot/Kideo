const http = require("http");

/**
 * @param data
 * @param path {string};
 * @param method {string};
 * @return {Promise<boolean>}
 */
async function sendData(data, path, method){

    try {

        const response = new Promise((resolve, reject) => {

            const request = http.request({host: "localhost", port: 5000, path: path, headers: {"Content-Type": "application/json"}, method: method}, res => {

                let body = "";

                res.on("data", chunk => {
                    body+=chunk;
                }).on("end", () => {

                    if(body !== ""){
                        body = JSON.parse(body);
                        resolve(body);
                    }

                }).on("error", err => {
                    reject(new Error(err.message));
                })

            })

            const json = JSON.stringify(data);

            request.write(json);

            request.end();

        });

        return !!response;

    } catch (err) {
        console.log(err);
    }

}

class KideoAPI {

    constructor() {

    }

    /**
     * @param data {{ServerID: string, XP: Number}};
     * @return {Promise<boolean>};
     */
    async createGuildSQL(data){
        return !! await sendData(data, "/api/guild", "POST");
    }

    /**
     * @return {Promise<boolean>};
     * @param data {{ServerID: string}}
     */
    async clearGuildWithID(data){
        return !! await sendData(data, "/api/deleteGuild", "POST");
    }

    /**
     * @param ID {string}
     * @return {Promise<void>}
     */
    async getDataWithID(ID){

    }

}

module.exports = KideoAPI;