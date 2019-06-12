const 
	message = require('../../config/messages').ready,
	loops = [
		require('../../loops/activity'),
		require('../../loops/channelName')
	];

module.exports = (bot) => {	

	// Start all loops
	loops.forEach(loop => {
		loop(bot);
	});

	console.log(message);
};
