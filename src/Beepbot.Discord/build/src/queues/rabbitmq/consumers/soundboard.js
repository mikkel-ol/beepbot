"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const soundboard_1 = require("src/soundboard");
class SoundboardConsumer {
    constructor() { }
    setup(connection) {
        this.connection = connection;
        this.exchange = this.connection.declareExchange('soundboard_play', 'fanout', {
            durable: false,
        });
        this.queue = this.connection.declareQueue('soundboard_play', {
            exclusive: false,
            durable: false,
            autoDelete: true,
        });
        this.queue.bind(this.exchange);
        this.queue.activateConsumer((message) => {
            const command = JSON.parse(message.getContent());
            soundboard_1.Soundboard.getInstance().play(command.voiceChannelId, command.audioUrl);
        });
        this.disconnectExchange = this.connection.declareExchange('voice_disconnect', 'fanout', { durable: false });
        this.disconnectQueue = this.connection.declareQueue('voice_disconnect', {
            exclusive: false,
            durable: false,
            autoDelete: true
        });
        this.disconnectQueue.bind(this.disconnectExchange);
        this.disconnectQueue.activateConsumer((message) => {
            const command = JSON.parse(message.getContent());
            soundboard_1.Soundboard.getInstance().disconnect(command.guildId);
        });
    }
    static getInstance() {
        if (!SoundboardConsumer.instance) {
            SoundboardConsumer.instance = new SoundboardConsumer();
        }
        return SoundboardConsumer.instance;
    }
}
exports.default = SoundboardConsumer;
