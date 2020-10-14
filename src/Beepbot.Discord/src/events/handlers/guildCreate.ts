import * as Discord from 'discord.js';
import { GuildAddedProducer } from 'src/queues/azure-service-bus/producers/guildAdded';
import Logger from '../../common/logger';
import { GuildChannel } from '../../models/guildChannel';

class GuildCreateHandler {
  static subscribe(bot: Discord.Client) {
    bot.on('guildCreate', (guild: Discord.Guild) => {
      Logger.getInstance().info(
        `Added to new guild with ID ${guild.id}`,
      );

      let customChannels = new Array<GuildChannel>();

      Object.assign(customChannels, [...guild.channels.cache.values()]);

      customChannels = customChannels.filter(guild => guild.type !== "news" && guild.type !== "store");

      // Send to RabbitMQ consumbers
      GuildAddedProducer.getInstance().send({
        id: guild.id,
        title: guild.name,
        avatar: guild.icon,
        channels: customChannels
      })
    });
  }
}

export default GuildCreateHandler;
