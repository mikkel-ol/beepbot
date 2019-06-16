const path = require('path');

const ids = require(path.join(global.discordRoot, '/config/ids')).users,
	volume = require(path.join(global.discordRoot, '/config/sound')).volume,
	welcomes = require(path.join(global.discordRoot, '/config/messages')).welcome,
	greetingsPath = '/assets/sounds/greetings/',
	fs = require(path.join(global.appRoot, '/services/fs'));

function newMember(member) {
	// Random greeting
	message = welcomes(member)[Math.floor(Math.random() * welcomes.length)];

	if (!member.guild.available)
		return console.error(`ERROR: Cannot greet new member on guild \"${member.guild.name}\". Guild unavailable`);

	// TODO: Let users select which text channel to send to (web site)
	member.guild.channels.filter((channel) => channel.type == 'text').first().send(message); // Send greeting to first text channel in guild
}

function voiceChannelJoin(newMember) {
	// Get array of all IDs
	var idArr = Object.values(ids);

	// If user is in array
	if (idArr.includes(parseInt(newMember.id))) {
		let dirs = fs.getDirectories(greetingsPath);
		let dir = dirs.find((currentDir) => currentDir == newMember.id);

		// If new member does not have greetings, return
		if (dir == undefined) return;

		newMember.voiceChannel
			.join()
			.then((connection) => {
				let file = fs.getRandomAudioFileFromDirectory(greetingsPath, dir);
				let fullPath = path.join(__dirname, '/../..', greetingsPath, newMember.id, '/', file);

				newMember.setMute(true);

				let dispatcher = connection.playFile(fullPath);
				dispatcher.setVolumeLogarithmic(volume);

				dispatcher.on('end', (reason) =>
						setTimeout(function() {
							if (!newMember.voiceChannel) return;
							// Stupid 'end' bug
							newMember.setMute(false);
						}),
					500
				);
			})
			.catch(console.log);
	}
}

module.exports = {
	newMember,
	voiceChannelJoin
};
