const path = require('path');

const express = require('express');

module.exports = (bot) => {
	const router = express.Router();

	router.get('/', (req, res) => {
		res.json({
            id: req.user.id,
            username: req.user.username,
            tag: req.user.discriminator
        });
	});

	return router;
};
