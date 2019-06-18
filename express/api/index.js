const express = require('express');

const controllers = require('./controllers');

function isAuthenticated(req, res, next) {
	if (req.isAuthenticated()) return next();

	return res.status(401).send("Not authorized");
}

module.exports = () => {
    const router = express.Router();
    
    router.use('/api', isAuthenticated, controllers());

    return router;
}