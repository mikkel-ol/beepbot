"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Amqp = require("amqp-ts");
const logger_1 = require("../../common/logger");
const soundboard_1 = require("./consumers/soundboard");
const guildAdded_1 = require("./producers/guildAdded");
class RabbitMQ {
    constructor() {
        this.logger = logger_1.default.getInstance();
        this.connection = new Amqp.Connection(process.env.BEEPBOT_RABBITMQ_URI);
        guildAdded_1.default.getInstance().setup(this.connection);
        soundboard_1.default.getInstance().setup(this.connection);
        this.connection.completeConfiguration().then(() => {
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
    static getInstance() {
        if (!RabbitMQ.instance) {
            RabbitMQ.instance = new RabbitMQ();
        }
        return RabbitMQ.instance;
    }
}
exports.default = RabbitMQ;
