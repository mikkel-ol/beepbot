"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuildAddedProducer = void 0;
class GuildAddedProducer {
    constructor() {
    }
    setup(client) {
        this.client = client;
        this.queueClient = this.client.createQueueClient('guild_added');
        this.sender = this.queueClient.createSender();
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new GuildAddedProducer();
        }
        return GuildAddedProducer.instance;
    }
    send(message) {
        this.sender.send({
            body: message,
        });
    }
}
exports.GuildAddedProducer = GuildAddedProducer;
