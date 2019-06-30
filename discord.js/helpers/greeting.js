const path = require('path');

const ids = require(path.join(global.discordRoot, '/config/ids')).users,
	volume = require(path.join(global.discordRoot, '/config/sounds')).volume,
	welcomes = require(path.join(global.discordRoot, '/config/messages')).welcome,
	greetingsPath = '/assets/sounds/greetings/',
	fs = require(path.join(global.appRoot, '/services/fs'));

const greetings = {
	newMember(member) {
		// Random greeting
		let messages = welcomes(member);
		let message = [Math.floor(Math.random() * messages.length)];

		if (!member.guild.available)
			return console.error(`ERROR: Cannot greet new member on guild \"${member.guild.name}\". Guild unavailable`);

		// TODO: Let users select which text channel to send to (website)
		member.guild.channels.filter((channel) => channel.type == 'text').first().send(message); // Send greeting to first text channel in guild
	},

	voiceChannelJoin(newMember) {
		// Get array of all IDs
		var idArr = Object.values(ids);

		// If user is in array
		if (idArr.includes(parseInt(newMember.id))) {
			const dirs = fs.getDirectories(greetingsPath);
			const dir = dirs.find((currentDir) => currentDir == newMember.id);

			// If new member does not have greetings, return
			if (dir == undefined) return;

			newMember.voiceChannel
				.join()
				.then((connection) => {
					const file = fs.getRandomFileFromDirectory(greetingsPath, dir);
					const fullPath = __dirname + '/../..' + greetingsPath + newMember.id + '/' + file;

					newMember.setMute(true);

					const dispatcher = connection.playFile(fullPath);
					dispatcher.setVolumeLogarithmic(volume);

					dispatcher.on('end', (reason) => newMember.setMute(false));
				})
				.catch(console.log);
		}
	},

	voiceChannelLeft(oldMember) {
		oldMember.voiceChannel.join().then((connection) => {
			connection.playFile(path.join(global.appRoot, greetingsPath, '/disconnected.wav')).setVolumeLogarithmic(volume-.4);
		});
	}
};

module.exports = greetings;
