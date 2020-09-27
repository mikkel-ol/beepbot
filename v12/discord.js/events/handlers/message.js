const path = require("path");
const foxReplies = require(path.join(global.discordRoot, "config/messages")).fox;

class MessageHandler {
    subscribe(bot) {
        bot.on('message', (message) => {
            // Ignore messages from bots
            if (message.author.bot) return;

            // What does the fox say
            if (message.content.match(/what does the fox say/i)) {
                const i = Math.floor(Math.random() * foxReplies.length);
                return message.channel.send(foxReplies[i]);
            }
        });
    }
}

module.exports = MessageHandler;
