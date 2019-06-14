const path = require('path');

const message = require(path.join(global.discordRoot, '/config/messages')).ready,
	loops = [
		require(path.join(global.discordRoot, '/loops/activity')),
		require(path.join(global.discordRoot, '/loops/channelname'))
	];

module.exports = (bot) => {
	bot.on('ready', () => {
		// Start all loops
		loops.forEach((loop) => {
			loop(bot);
		});

		console.log(message);
	});
};
