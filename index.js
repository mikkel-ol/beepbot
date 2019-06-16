const path = require('path');
global.appRoot = path.resolve(__dirname);

const 
    Bot = require('./discord.js/main'),
    Logger = require('./services/logger'),
    Express = require('./express/main');

Logger();

Express.start();

Bot.start();