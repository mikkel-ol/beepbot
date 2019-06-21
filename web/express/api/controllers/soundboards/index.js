const express = require('express');

const voiceChannel = require('./voiceChannel');
const play = require('./play');

module.exports = (bot) => {
    const router = express.Router();

    router.use('/voicechannel', voiceChannel(bot));
    router.use('/play', play(bot));

    return router;
}