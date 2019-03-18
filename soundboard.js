const 	{ SOUNDPATH,
					DEFAULT_VOLUME}	= require('./config');

module.exports = {
	play
}

function play(file, voiceChannel) {
	if (voiceChannel.connection) {
		voiceChannel.connection.playFile(SOUNDPATH + 'soundboard/' + file).setVolumeLogarithmic(DEFAULT_VOLUME);
	}
	else {
		voiceChannel.join()
		.then(connection => {
			connection.playFile(SOUNDPATH + 'soundboard/' + file).setVolumeLogarithmic(DEFAULT_VOLUME);
		});
	}
}
