const path = require('path');
global.appRoot = path.resolve(__dirname);

const 
    Bot = require('./discord.js/main'),
    Logger = require('./services/logger');

Logger();

Bot.start();