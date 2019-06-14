const path = require('path');

const 
	interval = require(path.join(global.discordRoot, '/config/intervals')).channelName,
	names = require(path.join(global.discordRoot, '/config/names')),
	id = require(path.join(global.discordRoot, '/config/ids')).server,
	colors = require(path.join(global.appRoot, '/common/colors'));

let newEmoji;

function set(bot) {
	const guild = bot.guilds.get(id);
	const voiceChannels = guild.channels.filter(channel => channel.type == "voice");
	const emojis = [];

	// Avoid stuck while loop
	if (names.length < voiceChannels.length) {
		const msg = colors.red + "ERROR: " + colors.default + "Cannot avoid duplicate channel names. More voice channels in guild than available channel names.";
		console.error(msg);
		return;
	}

	// Iterate through all voice channels
	for (const [id, channel] of voiceChannels) {

		// Get new, random emoji from array
		let i = Math.floor(Math.random() * names.length);
		newEmoji = names[i];

		// Avoid duplicates
		while (emojis.includes(newEmoji)) {
			i = Math.floor(Math.random() * names.length);
			newEmoji = names[i];
		}

		// Set new name with random emoji
		channel.setName("# " + newEmoji)
			.then()
			.catch(console.error);

		// Save emoji to array
		emojis.push(newEmoji);
	}
	console.log(colors.green + "Changed names of voice channels");
}

function loop(bot) {
	const span = interval.max - interval.min;
	const delay = Math.round(Math.random() * span) + interval.min;

	setTimeout(function() {
		set(bot);
		loop(bot); // Calls itself when done (does stack up)
	}, delay);
}

module.exports = (bot) => {
	loop(bot);
}
