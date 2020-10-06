import * as Amqp from 'amqp-ts';
import Logger from '../common/logger';

class RabbitMQ {
  private static instance: RabbitMQ;
  private connection: Amqp.Connection;
  private exchange: Amqp.Exchange;
  private queue: Amqp.Queue;
  private logger: Logger;

  private constructor() {
    this.connection = new Amqp.Connection(process.env.BEEPBOT_RABBITMQ_URI);
    this.exchange = this.connection.declareExchange('soundboard', 'fanout', { durable: false });
    this.queue = this.connection.declareQueue('soundboard', { exclusive: false, durable: false, autoDelete: true });
    this.logger = Logger.getInstance();

    this.queue.bind(this.exchange);

    this.queue.activateConsumer((message) => {
      console.log('Message received: ' + message.getContent());
    });

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
