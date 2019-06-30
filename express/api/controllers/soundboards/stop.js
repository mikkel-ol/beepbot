const express = require('express');

module.exports = (bot) => {
	const router = express.Router();

	router.post('/', (req, res) => {
		if (!bot.connection) return res.status(400).send('Bot not playing');

		bot.connection.disconnect();
		bot.connection = null;

		res.status(204).end();
	});

	return router;
};
