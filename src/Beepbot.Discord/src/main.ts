import * as Discord from 'discord.js';
import Events from './events';
import { ServiceBus } from './queues/azure-service-bus';
import RabbitMQ from './queues/rabbitmq';
import { Soundboard } from './soundboard';

const client = new Discord.Client();

client.login(process.env.BEEPBOT_DISCORD_TOKEN).then(() => {
  //RabbitMQ.getInstance();
  ServiceBus.getInstance();
  Events.attach(client);
  Soundboard.init(client);
});
