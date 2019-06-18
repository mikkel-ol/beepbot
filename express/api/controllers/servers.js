const express = require('express');

module.exports = () => {
    const router = express.Router();

    //! Testing
    const all = [
        {
            id: 123,
            name: "The best server",
            textChannels: [
                {
                    id: 1,
                    name: "irc"
                },
                {
                    id: 2,
                    name: "music",
                }
            ],
            voiceChannels: [
                {
                    id: 1,
                    name: "# 1"
                },
                {
                    id: 2,
                    name: "# 2"
                }
            ]
        },
        {
            id: 321,
            name: "Bot testing"
        }
    ]

    router.get('/', (req, res) => {
        res.json(all);
    });

    return router;
}