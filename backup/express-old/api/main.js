const controller = require('./controllers/main');

module.exports = (app) => {
    const router = require('express').Router();

    router.use('/api', controller(app));

    return router;
}