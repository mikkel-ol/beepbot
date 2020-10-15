"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const guildAdded_1 = require("src/queues/azure-service-bus/producers/guildAdded");
const logger_1 = require("../../common/logger");
class GuildCreateHandler {
    static subscribe(bot) {
        bot.on('guildCreate', (guild) => {
            logger_1.default.getInstance().info(`Added to new guild with ID ${guild.id}`);
            let customChannels = new Array();
            Object.assign(customChannels, [...guild.channels.cache.values()]);
            customChannels = customChannels.filter(guild => guild.type !== "news" && guild.type !== "store");
            guildAdded_1.GuildAddedProducer.getInstance().send({
                id: guild.id,
                title: guild.name,
                avatar: guild.icon,
                channels: customChannels
            });
        });
    }
}
exports.default = GuildCreateHandler;
