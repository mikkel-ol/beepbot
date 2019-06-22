const path = require('path');
const express = require('express');

const config = require(path.join(global.discordRoot, '/config/sounds'));

module.exports = (bot) => {
	const router = express.Router();

	router.post('/', async (req, res) => {
		if (!req.body.file) return res.status(400).send('Sound clip not found');
		if (!bot.current) return res.status(404).send('No channel selected');

		if (!bot.connection) {
			bot.connection = await bot.guilds.get(bot.current.server).channels.get(bot.current.voiceChannel).join();
		}

		bot.connection
			.playFile(path.join(global.appRoot, config.paths.soundboard, req.body.file))
			.setVolumeLogarithmic(config.volume);

		res.status(204).end();
	});

	return router;
};
