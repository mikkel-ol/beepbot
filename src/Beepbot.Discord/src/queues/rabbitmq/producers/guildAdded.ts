import * as Amqp from 'amqp-ts';
import { Message } from 'amqp-ts';
import { Guild } from 'src/models/guild';

class GuildAddedProducer {
  private static instance: GuildAddedProducer;
  private connection: Amqp.Connection;
  private exchange: Amqp.Exchange;
  private queue: Amqp.Queue;

  private constructor() {}

  public setup(connection: Amqp.Connection) {
    this.connection = connection;

    this.exchange = this.connection.declareExchange('guild_added', 'fanout', {
      durable: false,
    });
    this.queue = this.connection.declareQueue('guild_added', {
      exclusive: false,
      durable: false,
      autoDelete: false,
    });
    
    this.queue.bind(this.exchange);
  }

  public send(newGuild: Guild) {
    this.queue.send(new Message(newGuild));
  }

  public static getInstance(): GuildAddedProducer {
    if (!GuildAddedProducer.instance) {
      GuildAddedProducer.instance = new GuildAddedProducer();
    }

    return GuildAddedProducer.instance;
  }
}

export default GuildAddedProducer;