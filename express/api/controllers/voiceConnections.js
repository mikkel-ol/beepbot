const path = require('path');

const express = require('express');

module.exports = (bot) => {
	const router = express.Router();

	router.get('/', (req, res) => {
		let all = [];

		bot.voiceConnections.forEach((vc, key) => {
			all.push({
				guild: key,
				channel: vc.channel.id
			})
		});

		return res.json(all);
	});

	return router;
};
