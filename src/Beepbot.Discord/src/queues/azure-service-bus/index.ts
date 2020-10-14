import { ServiceBusClient } from '@azure/service-bus';
import Logger from 'src/common/logger';
import { SoundboardConsumer } from './consumers/soundboard';
import { GuildAddedProducer } from './producers/guildAdded';

export class ServiceBus {
  private logger: Logger;
  private static instance: ServiceBus;
  
  public client: ServiceBusClient;
  
  private constructor() {
    this.logger = Logger.getInstance();

    this.client = ServiceBusClient.createFromConnectionString(process.env.BEEPBOT_AZURE_SERVICE_BUS_CONNECTION_STRING);

    this.logger.success('Azure Service Bus - Connection established');

    // Setup consumers and listeners by calling constructor
    GuildAddedProducer.getInstance().setup(this.client);
    SoundboardConsumer.getInstance().setup(this.client);
  }

  public static getInstance(): ServiceBus {
    if (!this.instance) {
      this.instance = new ServiceBus();
    }

    return ServiceBus.instance;
  }
}
