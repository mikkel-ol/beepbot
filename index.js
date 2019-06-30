const path = require('path');
global.appRoot = path.resolve(__dirname);

const 
    Bot = require('./discord.js'),
    Logger = require('./services/logger'),
    Express = require('./express');

Logger();

Bot.start().then(bot => {
    Express.start(bot);
})
