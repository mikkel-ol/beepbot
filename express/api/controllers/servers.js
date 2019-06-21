const path = require('path');

const express = require('express');
const commonGuildsHelper = require(path.join(global.expressRoot, '/helpers/commonGuilds'));

module.exports = (bot) => {
	const router = express.Router();

	router.get('/', (req, res) => {
		var servers = commonGuildsHelper(bot, req.user);

		res.json(servers);
	});

	return router;
};
