import * as Amqp from 'amqp-ts';
import Logger from '../common/logger';
import SoundboardConsumer from './consumers/soundboard';
import GuildAddedProducer from './producers/guildAdded';

class RabbitMQ {
  private static instance: RabbitMQ;
  private connection: Amqp.Connection;
  private logger: Logger;
  
  private constructor() {
    this.logger = Logger.getInstance();

    this.connection = new Amqp.Connection(process.env.BEEPBOT_RABBITMQ_URI);

    // Setup consumers and producers
    GuildAddedProducer.getInstance().setup(this.connection);
    SoundboardConsumer.getInstance().setup(this.connection);

    this.connection.completeConfiguration().then(() => {
      // Ensure queue, binding or consumer exist
    });

    this.connection.on('open_connection', () => {
      this.logger.success('RabbitMQ - Connection established');
    });

    this.connection.on('close_connection', () => {
      this.logger.info('RabbitMQ - Connection closed');
    });

    this.connection.on('lost_connection', () => {
      this.logger.error('RabbitMQ - Lost connection');
    });

    this.connection.on('trying_connect', () => {
      this.logger.info('RabbitMQ - Trying reconnect..');
    });

    this.connection.on('re_established_connection', () => {
      this.logger.success('RabbitMQ - Connection reestablished');
    });

    this.connection.on('error_connection', (err) => {
      this.logger.error('RabbitMQ - Error during connection: ' + err);
    });
  }

  public static getInstance(): RabbitMQ {
    if (!RabbitMQ.instance) {
      RabbitMQ.instance = new RabbitMQ();
    }

    return RabbitMQ.instance;
  }
}

export default RabbitMQ;
