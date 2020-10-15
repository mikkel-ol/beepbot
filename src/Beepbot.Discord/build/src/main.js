"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Discord = require("discord.js");
const events_1 = require("./events");
const azure_service_bus_1 = require("./queues/azure-service-bus");
const soundboard_1 = require("./soundboard");
const client = new Discord.Client();
client.login(process.env.BEEPBOT_DISCORD_TOKEN).then(() => {
    azure_service_bus_1.ServiceBus.getInstance();
    events_1.default.attach(client);
    soundboard_1.Soundboard.init(client);
});
