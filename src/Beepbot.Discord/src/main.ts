import * as Discord from 'discord.js';
import Events from './events';
import RabbitMQ from './rabbitmq';
import { Soundboard } from './soundboard';

const client = new Discord.Client();

client.login(process.env.BEEPBOT_DISCORD_TOKEN).then(() => {
  RabbitMQ.getInstance();
  Events.attach(client);
  Soundboard.init(client);
});
