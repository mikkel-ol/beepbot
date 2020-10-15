"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceBus = void 0;
const service_bus_1 = require("@azure/service-bus");
const logger_1 = require("src/common/logger");
const soundboard_1 = require("./consumers/soundboard");
const guildAdded_1 = require("./producers/guildAdded");
class ServiceBus {
    constructor() {
        this.logger = logger_1.default.getInstance();
        this.client = service_bus_1.ServiceBusClient.createFromConnectionString(process.env.BEEPBOT_AZURE_SERVICE_BUS_CONNECTION_STRING);
        this.logger.success('Azure Service Bus - Connection established');
        guildAdded_1.GuildAddedProducer.getInstance().setup(this.client);
        soundboard_1.SoundboardConsumer.getInstance().setup(this.client);
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new ServiceBus();
        }
        return ServiceBus.instance;
    }
}
exports.ServiceBus = ServiceBus;
