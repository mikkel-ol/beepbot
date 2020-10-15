"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Soundboard = void 0;
const tslib_1 = require("tslib");
const axios_1 = require("axios");
const memoize = require("memoizee");
class Soundboard {
    constructor(client) {
        this.connections = new Map();
        this.client = client;
    }
    play(voiceChannelId, audio) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const channel = (yield this.client.channels.fetch(voiceChannelId));
            const cached = memoize(axios_1.default.get, {
                promise: true,
                maxAge: 10 * 60 * 1000,
            });
            channel.join().then((connection) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                this.connections.set(channel.guild.id, connection);
                const cachedAudioStream = (yield cached(audio, { responseType: 'stream' })).data;
                connection.play(cachedAudioStream);
            }));
        });
    }
    disconnect(guildId) {
        this.connections.get(guildId).disconnect();
    }
    static init(client) {
        Soundboard.instance = new Soundboard(client);
    }
    static getInstance() {
        if (!Soundboard.instance) {
            throw new Error('Soundboard: Discord client not initialized');
        }
        return Soundboard.instance;
    }
}
exports.Soundboard = Soundboard;
