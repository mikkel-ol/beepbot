import * as Amqp from 'amqp-ts';
import { PlayCommand } from '../../models/playCommand';
import { Soundboard } from '../../soundboard';

class SoundboardConsumer {
  private static instance: SoundboardConsumer;
  private connection: Amqp.Connection;
  private exchange: Amqp.Exchange;
  private queue: Amqp.Queue;

  private constructor() {}

  public setup(connection: Amqp.Connection) {
    this.connection = connection;

    this.exchange = this.connection.declareExchange(
      'soundboard_play',
      'fanout',
      {
        durable: false,
      },
    );
    this.queue = this.connection.declareQueue('soundboard_play', {
      exclusive: false,
      durable: false,
      autoDelete: true,
    });

    this.queue.bind(this.exchange);

    this.queue.activateConsumer((message) => {
      // Play command received
      const command: PlayCommand = JSON.parse(message.getContent());

      Soundboard.getInstance().play(command.voiceChannelId, command.audioUrl);
    });
  }

  public static getInstance(): SoundboardConsumer {
    if (!SoundboardConsumer.instance) {
      SoundboardConsumer.instance = new SoundboardConsumer();
    }

    return SoundboardConsumer.instance;
  }
}

export default SoundboardConsumer;
