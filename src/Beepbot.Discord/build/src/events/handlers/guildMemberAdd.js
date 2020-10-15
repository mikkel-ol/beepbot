"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("../../common/logger");
const greetings = {
    random: (member) => {
        const messages = [`AND HIS NAME IS **JOHN ${member.displayName}**!`];
        return messages[Math.floor(Math.random() * messages.length)];
    },
};
class GuildMemberAddHandler {
    static subscribe(bot) {
        bot.on('guildMemberAdd', (member) => {
            logger_1.default.getInstance().info(`New member \"${member.displayName}\" with ID ${member.id} added to server \"${member.guild.name}\" with ID ${member.guild.id}`);
            const msg = greetings.random(member);
            if (!member.guild.available)
                return console.error(`ERROR: Cannot greet new member on guild \"${member.guild.name}\". Guild unavailable`);
            member.guild.channels.cache
                .filter((channel) => channel.type == 'text')
                .first().send(msg);
        });
    }
}
exports.default = GuildMemberAddHandler;
