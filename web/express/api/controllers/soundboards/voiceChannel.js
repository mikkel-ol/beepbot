const express = require('express');

module.exports = (bot) => {
    const router = express.Router();

    router.put('/', (req, res) => {
        console.log(req.body);
    });

    return router;
}