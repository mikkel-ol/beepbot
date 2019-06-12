const ids = require('../config/ids').users,
	volume = require('../config/sound').volume,
	welcomes = require('../config/messages').welcome,
	path = '/assets/sounds/greetings/',
	fs = require('../../services/fs');

function newMember(member) {
	message = welcomes(member)[Math.floor(Math.random() * welcomes.length)];

	if (!member.guild.available)
		return console.error(`ERROR: Cannot greet new member on guild \"${member.guild.name}\". Guild unavailable`);
	
	// TODO: Let users select which text channel to send to
	member.guild.channels.filter((channel) => channel.type == 'text').first().send(message); // Send greeting to first text channel in guild
}

function voiceChannelJoin(newMember) {
	// Get array of all IDs
	var idArr = Object.values(ids);

	// If user is in array
	if (idArr.includes(parseInt(newMember.id))) {
		const dirs = fs.getDirectories(path);
		const dir = dirs.find((currentDir) => currentDir == newMember.id);
		
		// If new member does not have greetings, return
		if (dir == undefined) return;

		newMember.voiceChannel.join()
			.then((connection) => {
				const file = fs.getRandomFileFromDirectory(path, dir);
				const fullPath = __dirname + '/../..' + path + newMember.id + '/' + file;

				newMember.setMute(true);

				const dispatcher = connection.playFile(fullPath);
				dispatcher.setVolumeLogarithmic(volume);

				dispatcher.on('end', (reason) => newMember.setMute(false));
			})
			.catch(console.log);
	}
}

module.exports = {
	newMember,
	voiceChannelJoin
};
