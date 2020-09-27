const path = require("path");
global.appRoot = path.resolve(__dirname);

const events = require('events');
const emitter = new events.EventEmitter();
global.emitter = emitter;

const Logger = require('./common/logger');
global.logger = new Logger();

const Fs = require("./common/fs");
global.fs = new Fs();

const Discord = require("./discord.js");
const discordApp = new Discord.Client();

const Express = require("./express/");
const express = new Express.Client();

discordApp.start();
express.start();