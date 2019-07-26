const express = require('express');

const sounds = require('./sounds');
const servers = require('./servers');
const soundboards = require('./soundboards/');
const user = require('./user');

module.exports = (bot) => {
    const router = express.Router();

	router.use('/sounds', sounds(bot));
	router.use('/servers', servers(bot));
	router.use('/soundboards', soundboards(bot));
	router.use('/user', user(bot));

	// Catch all unfound routes
	router.use('*', (req, res) => res.status(404).send('Route not found'));

	return router;
};
