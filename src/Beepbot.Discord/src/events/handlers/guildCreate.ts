import * as Discord from 'discord.js';
import Logger from '../../common/logger';
import GuildAddedProducer from '../../rabbitmq/producers/guildAdded';

class GuildCreateHandler {
  static subscribe(bot: Discord.Client) {
    bot.on('guildCreate', (guild: Discord.Guild) => {
      Logger.getInstance().info(
        `Added to new guild with ID ${guild.id}`,
      );

      // Send to RabbitMQ consumbers
      GuildAddedProducer.getInstance().send({
        id: guild.id,
        title: guild.name,
        avatar: guild.icon
      })
    });
  }
}

export default GuildCreateHandler;
