const express = require('express');

module.exports = () => {
    const router = express.Router();

    //! Testing
    const all = [
        {
            id: "1"
        },
        {
            id: "2"
        }
    ]

    router.get('/', (req, res) => {
        res.json(all);
    });

    return router;
}