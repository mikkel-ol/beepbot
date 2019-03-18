const 	{ SOUNDPATH } = require('./config');

function tell(voiceChannel) {
	voiceChannel.join()
		.then(connection => {
			const dispatcher = connection.playFile(SOUNDPATH + '420.wav')
			dispatcher.setVolume(.5);
			dispatcher.on('end', reason => setTimeout(function() { // Stupid 'end' bug
		        voiceChannel.leave();
			}), 500)
		})
		.catch(console.error);
}

module.exports = {
	tell: tell
}