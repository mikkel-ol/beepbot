const express = require('express');

const voiceChannel = require('./voiceChannel');
const play = require('./play');
const stop = require('./stop');

module.exports = (bot) => {
    const router = express.Router();

    router.use('/voicechannel', voiceChannel(bot));
    router.use('/play', play(bot));
    router.use('/stop', stop(bot));

    return router;
}