import * as Discord from 'discord.js';
import Logger from '../../common/logger';

const greetings = {
  random: (member: Discord.GuildMember): string => {
    const messages = [`AND HIS NAME IS **JOHN ${member.displayName}**!`];
    return messages[Math.floor(Math.random() * messages.length)];
  },
};

class GuildMemberAddHandler {
  static subscribe(bot: Discord.Client) {
    bot.on('guildMemberAdd', (member: Discord.GuildMember) => {
      Logger.getInstance().info(
        `New member \"${member.displayName}\" with ID ${member.id} added to server \"${member.guild.name}\" with ID ${member.guild.id}`,
      );

      // Random greeting
      const msg = greetings.random(member);

      if (!member.guild.available)
        return console.error(
          `ERROR: Cannot greet new member on guild \"${member.guild.name}\". Guild unavailable`,
        );

      // TODO: Let users select which text channel to send to (website)
      // Send greeting to first text channel in guild
      (member.guild.channels.cache
        .filter((channel) => channel.type == 'text')
        .first() as Discord.TextChannel).send(msg);
    });
  }
}
export default GuildMemberAddHandler;
