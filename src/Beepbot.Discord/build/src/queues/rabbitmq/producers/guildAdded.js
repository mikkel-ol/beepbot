"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const amqp_ts_1 = require("amqp-ts");
class GuildAddedProducer {
    constructor() { }
    setup(connection) {
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
    send(newGuild) {
        this.queue.send(new amqp_ts_1.Message(newGuild));
    }
    static getInstance() {
        if (!GuildAddedProducer.instance) {
            GuildAddedProducer.instance = new GuildAddedProducer();
        }
        return GuildAddedProducer.instance;
    }
}
exports.default = GuildAddedProducer;
