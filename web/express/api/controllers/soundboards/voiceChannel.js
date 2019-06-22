const express = require('express');

module.exports = (bot) => {
	const router = express.Router();

	router.put('/', (req, res) => {
		if (!req.body.id) return res.status(400).send("No ID's");

		bot.current = {
			server: req.body.id.server,
			voiceChannel: req.body.id.channel
		}

		bot.guilds.get(bot.current.server).channels.get(bot.current.voiceChannel).join().then((connection) => {
			bot.connection = connection;
		});
        
        res.status(204).end();
	});

	return router;
};
