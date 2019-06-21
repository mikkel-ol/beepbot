const express = require('express');
const auth = require('./auth');

module.exports = () => {
    const router = express.Router();

    router.use('/auth', auth());

    return router;
}