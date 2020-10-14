import { QueueClient, Sender, ServiceBusClient } from '@azure/service-bus';

export class GuildAddedProducer {
  public static instance: GuildAddedProducer;
  private client: ServiceBusClient;
  private queueClient: QueueClient;
  private sender: Sender;

  private constructor() {
    
  }

  public setup(client: ServiceBusClient) {
    this.client = client;

    this.queueClient = this.client.createQueueClient('guild_added');
    this.sender = this.queueClient.createSender();
  }

  public static getInstance(): GuildAddedProducer {
    if (!this.instance) {
      this.instance = new GuildAddedProducer();
    }

    return GuildAddedProducer.instance;
  }

  public send(message: any): void {
    this.sender.send({
      body: message,
    });
  }
}
