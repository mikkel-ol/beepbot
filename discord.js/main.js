const 
    Discord = require('discord.js-commando'),
	bot = new Discord.Client(),
	commands = require('./commands/main'),
	events = require('./events/main'),
	token = require('./token');

module.exports = {
	start: () => {
		// Add commands to bot
		commands(bot);

		// Register events on bot
		events(bot);

		// Log the bot in
		bot.login(token);
	}
};
