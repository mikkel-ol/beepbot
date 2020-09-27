const path = require('path');

class GuildMemberAddHandler {
    subscribe(bot) {
        bot.on('guildMemberAdd', (member) => {
            logger.info(`New member with ID ${member.id} added to server with ID ${member.guild.id}`);
            
            global.greeting.newMember(member);
        });
    }
}

module.exports = GuildMemberAddHandler;