const express = require('express');

const sounds = require('./sounds');
const servers = require('./servers');

module.exports = () => {
    const router = express.Router();

	router.use('/sounds', sounds());
	router.use('/servers', servers());

	// Catch all unfound routes
	router.use('*', (req, res) => res.status(404).send('Route not found'));

	return router;
};
