"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SoundboardConsumer = void 0;
const tslib_1 = require("tslib");
const service_bus_1 = require("@azure/service-bus");
const logger_1 = require("src/common/logger");
const soundboard_1 = require("src/soundboard");
class SoundboardConsumer {
    constructor() {
        this.playHandler = (message) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const command = message.body;
            soundboard_1.Soundboard.getInstance().play(command.voiceChannelId, command.audioUrl);
        });
        this.playHandlerError = (error) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.logger.error('Soundboard: Play command error. Could be parsing error');
            this.logger.error(error.message);
        });
        this.disconnectHandler = (message) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const command = message.body;
            soundboard_1.Soundboard.getInstance().disconnect(command.guildId);
        });
        this.disconnectHandlerError = (error) => {
            this.logger.error('Soundboard: Disconnect command error. Could be parsing error');
            this.logger.error(error.message);
        };
        this.logger = logger_1.default.getInstance();
    }
    setup(client) {
        this.client = client;
        this.playQueue = this.client.createQueueClient('soundboard_play');
        this.disconnectQueue = this.client.createQueueClient('soundboard_disconnect');
        this.playReceiver = this.playQueue.createReceiver(service_bus_1.ReceiveMode.receiveAndDelete);
        this.disconnectReceiver = this.disconnectQueue.createReceiver(service_bus_1.ReceiveMode.receiveAndDelete);
        this.playReceiver.registerMessageHandler(this.playHandler, this.playHandlerError);
        this.disconnectReceiver.registerMessageHandler(this.disconnectHandler, this.disconnectHandlerError);
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new SoundboardConsumer();
        }
        return SoundboardConsumer.instance;
    }
}
exports.SoundboardConsumer = SoundboardConsumer;
