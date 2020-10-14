import {
  MessagingError,
  QueueClient,
  ReceiveMode,
  Receiver,
  ServiceBusClient,
  ServiceBusMessage,
} from '@azure/service-bus';
import Logger from 'src/common/logger';
import { DisconnectCommand } from 'src/models/disconnectCommand';
import { PlayCommand } from 'src/models/playCommand';
import { Soundboard } from 'src/soundboard';

export class SoundboardConsumer {
  public static instance: SoundboardConsumer;
  private client: ServiceBusClient;
  private logger: Logger;

  private playQueue: QueueClient;
  private disconnectQueue: QueueClient;
  private playReceiver: Receiver;
  private disconnectReceiver: Receiver;

  private constructor() {
    this.logger = Logger.getInstance();
  }

  public setup(client: ServiceBusClient) {
    this.client = client;

    this.playQueue = this.client.createQueueClient('soundboard_play');
    this.disconnectQueue = this.client.createQueueClient(
      'soundboard_disconnect',
    );
    this.playReceiver = this.playQueue.createReceiver(
      ReceiveMode.receiveAndDelete,
    );
    this.disconnectReceiver = this.disconnectQueue.createReceiver(
      ReceiveMode.receiveAndDelete,
    );

    this.playReceiver.registerMessageHandler(
      this.playHandler,
      this.playHandlerError,
    );
    this.disconnectReceiver.registerMessageHandler(
      this.disconnectHandler,
      this.disconnectHandlerError,
    );
  }

  public static getInstance(): SoundboardConsumer {
    if (!this.instance) {
      this.instance = new SoundboardConsumer();
    }

    return SoundboardConsumer.instance;
  }

  private playHandler = async (message: ServiceBusMessage) => {
    // Play command received
    const command = message.body as PlayCommand;

    Soundboard.getInstance().play(command.voiceChannelId, command.audioUrl);
  };

  private playHandlerError = async (error: MessagingError | Error) => {
    // TODO: Handle error
    this.logger.error('Soundboard: Play command error. Could be parsing error');
    this.logger.error(error.message);
  };

  private disconnectHandler = async (message: ServiceBusMessage) => {
    // Disconnect command received
    const command = message.body as DisconnectCommand;

    Soundboard.getInstance().disconnect(command.guildId);
  };

  private disconnectHandlerError = (error: MessagingError | Error) => {
    // TODO: Handle error
    this.logger.error('Soundboard: Disconnect command error. Could be parsing error');
    this.logger.error(error.message);
  };
}
