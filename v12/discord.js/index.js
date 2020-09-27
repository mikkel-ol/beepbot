// Set discord.js folder root
global.discordRoot = global.appRoot + '/discord.js';
const fs = global.fs;
const path = require('path');

const Discord = require('discord.js');
const client = new Discord.Client();

const token = process.env.BEEPBOT_TOKEN;

const Events = require('./events');
const eventDispatcher = new Events();

const Helpers = require('./helpers');
const helperDispatcher = new Helpers();

const Loops = require('./loops');
const loopDispatcher = new Loops();

const Soundboard = require("./soundboard");
const soundboard = new Soundboard.Client();

class Client {
    constructor() {
        global.bot = client;
    }

    async start() {
        await client.login(token);

        eventDispatcher.attach();
        helperDispatcher.attach();
        loopDispatcher.attach();
        soundboard.attach();
    }
}

module.exports = {
    Client
};
