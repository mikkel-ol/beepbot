const path = require('path');

const soundPath = require(path.join(global.discordRoot, '/config/sound')).paths.fourtwenty;

module.exports = (voiceChannel) => {
	voiceChannel.join()
		.then(connection => {
			const dispatcher = connection.playFile(__dirname + '../..' + soundPath + '420.wav')

			dispatcher.setVolume(.5);
			dispatcher.on('end', (reason) =>
						setTimeout(function() {
							// Stupid 'end' bug
							voiceChannel.leave();
						}),
					500
				);
		})
		.catch(console.error);
}