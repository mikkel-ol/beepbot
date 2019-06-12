const 
	replies = require('../../config/messages'),
	probability = require('../../config/probabilities').ninegagReply;

module.exports = (bot) => {
	bot.on('message', (message) => {

		// Ignore messages from bots
		if (message.author.bot) return;

		// 9gag
		if (message.content.match(/9gag.com/i)) {
			const i = Math.floor(Math.random() * replies.ninegag.length);
			const shouldReply = Math.floor(Math.random() * (1 / probability)) === 0;

			if (shouldReply)
				return message.channel.send(replies.ninegag[i]);
		}

		// What does the fox say
		if (message.content.match(/what does the fox say/i)) {
			const i = Math.floor(Math.random() * replies.fox.length);
			return message.channel.send(replies.fox[i]);
		}
	});
};
