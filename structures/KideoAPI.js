const http = require("http");
const https = require("https");
const config = require("../config.json");

/**
 * @param data
 * @param path {string};
 * @param method {string};
 * @return {Promise<boolean>}
 */
async function sendData(data, path, method){

    try {

        const response = new Promise((resolve, reject) => {

            const request = http.request({host: "0.0.0.0", port: 5000, path: path, headers: {"Content-Type": "application/json"}, method: method}, res => {

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

/**
 * @param body
 * @param path {string};
 * @param method {string};
 * @return {Promise<JSON>}
 */
async function getData(body, path, method){
    try {

        const response = new Promise((resolve, reject) => {

            const request = http.request({host: "0.0.0.0", port: 5000, path: path, headers: {"Content-Type": "application/json"}, method: method}, res => {

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

            request.write(JSON.stringify(body));

            request.end();

        })

        return response;

    } catch (err) {
        console.log(err)
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
        return !! await sendData(data, "/api/guild", "POST")
    }

    /**
     * @param data {{ServerID: string}}
     * @return {Promise<boolean>};
     */
    async clearGuildWithID(data){
        return !! await sendData(data, "/api/deleteGuild", "POST")
    }

    /**
     * @param ID {string}
     * @return {Promise<JSON>}
     */
    async getDataWithID(ID){
        return await getData({ServerID: ID}, "/api/guildID", "POST");
    }

    async changePrefixGuildID(newPrefix, guildID){
        return await sendData({ServerID: guildID, Prefix: newPrefix}, "/api/guildPrefix", "POST");
    }

    /**
     * @return {Promise<string>}
     */
    async getDogURL(){

        try {

            const response = new Promise((resolve, reject) => {

                const request = https.request({host: "dog.ceo", method: "GET", headers: {"Content-Type": "application/json"}, path: "/api/breeds/image/random", port: 443}, res => {

                    let body = "";

                    res.on("data", chunk => {
                        body+=chunk;
                    }).on("end", () => {

                        body = JSON.parse(body);

                        resolve(body.message);

                    }).on("error", err => {
                        reject(new Error(err.message));
                    })

                })

                request.end();

            })

            return response;

        } catch (err) {
            console.log(err);
        }

    }

    /**
     * @return {Promise<string>}
     */
    async getCatURL(){

        try {

            const response = new Promise((resolve, reject) => {

                const request = https.request({host: "api.thecatapi.com", method: "GET", headers: {"Content-Type": "application/json"}, path: "/v1/images/search", port: 443}, res => {

                    let body = "";

                    res.on("data", chunk => {
                        body+=chunk;
                    }).on("end", () => {

                        body = JSON.parse(body);

                        resolve(body[0].url);

                    }).on("error", err => {
                        reject(new Error(err.message));
                    })

                })

                request.end();

            })

            return response;

        } catch (err) {
            console.log(err);
        }
    }

    async addPointXpGuild(ServerID){
        try {

            const response = new Promise(async (resolve, reject) => {

                const data = await sendData({ServerID: ServerID}, "/api/xpGuild", "POST");

                resolve(data);

            });

            return !!response;

        } catch (err) {
            console.log(err);
        }
    }

    /**
     * @param nameGif {string}
     * @return {Promise<string>}
     */
    async getGifWithName(nameGif){
        try {

            return new Promise((resolve, reject) => {

                const config = require("../config.json");

                const path = "/v1/gifs/search?api_key=" + config.giphyToken + "&q=" + nameGif + "&limit=100&offset=0&rating=g&lang=en"

                const request = https.request({
                    host: "api.giphy.com",
                    path: path,
                    port: 443,
                    method: "GET",
                    headers: {"Content-Type": "application/json"}
                }, res => {

                    let body = "";

                    res.on("data", chunk => {
                        body += chunk;
                    }).on("end", () => {
                        if (body !== "") {
                            body = JSON.parse(body);
                        }

                        if(body.pagination === undefined){
                            if(body.meta.status === 414){
                                resolve(undefined);
                                return;
                            }
                        }else if(body.pagination.count === 0){
                            resolve(undefined);
                            return;
                        }

                        const number = Math.floor(Math.random() * (body.pagination.count / 2));

                        const url = body.data[number].embed_url;

                        resolve(url);

                    }).on("error", err => {
                        reject(new Error(err.message));
                    })

                })

                request.end();

            });

        } catch (err) {
            console.log(err);
        }
    }

    /**
     * @param text {string}
     * @return {Promise<string>}
     */
    async talkWithOpenAI(text){
        try {

            const response = new Promise((resolve, reject) => {

                const request = https.request({host: "api.openai.com", path: "/v1/engines/text-davinci-002/completions", method: "POST", headers: {"Content-Type": "application/json", "Authorization": "Bearer " + config.openAiToken}}, res => {

                    let body = "";

                    res.on("data", chunk => {
                        body+=chunk;
                    }).on("end", () => {

                        if(body !== ""){
                            body = JSON.parse(body);
                        }

                        if(body.choices[0] !== undefined){
                            if(body.choices[0].text !== undefined){
                                if(body.choices[0].text === undefined){
                                    resolve(undefined)
                                }else {
                                    resolve(body.choices[0].text);
                                }
                            }
                        }

                    }).on("error", err => {
                        reject(new Error(err.message));
                    })

                });

                const data = {
                    "prompt": text,
                    "temperature": 0.7,
                    "max_tokens": 2000,
                    "top_p": 1,
                    "frequency_penalty": 0,
                    "presence_penalty": 0
                }


                request.write(JSON.stringify(data));

                request.end();

            });

            return response;

        } catch (err) {
            console.log(err);
        }
    }

}

module.exports = KideoAPI;