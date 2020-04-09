// Set discord.js folder root
global.discordRoot = global.appRoot + '/discord.js';

const serversDbContext = require('./helpers/database').Servers;

const Discord = require('discord.js-commando'),
	bot = new Discord.Client(),
	commands = require('./commands'),
	events = require('./events'),
	token = process.env.BEEPBOT_TOKEN,
	fs = require('fs');

module.exports = {
	start: async () => {
		// Add commands to bot
		commands(bot);

		// Register events on bot
		events(bot);

		// Log the bot in
		await bot.login(token);

		
		// Save all the bots servers with roles in database
		let db = new serversDbContext();

		// TODO: Might drop all servers and update to current upon restarting bot
		//db.drop();

		bot.guilds.forEach(async guild => {
			let roleIDs = [];

			guild.roles.forEach(role => {
				roleIDs.push(role.id);
			});

			await db.add({id: guild.id, roles: roleIDs});
		});

		return bot;
	}
};
