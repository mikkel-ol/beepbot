const soundboard = require('./soundboard');

module.exports = (app) => {
    const router = require('express').Router();

    // Attach controllers
    router.use('/soundboard', soundboard(app));

    router.use('*', (req, res) => res.status(404)
        .send("Not found"));

    return router;
}