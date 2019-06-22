const express = require('express');
const path = require('path');

const fs = require(path.join(global.appRoot, "/services/fs"));

const soundPath = require(path.join(global.discordRoot, "/config/sounds")).paths.soundboard;

module.exports = () => {
    const router = express.Router();

    router.get('/', (req, res) => {
        const allNamesWithExtension = fs.getFiles(soundPath);
        const allNames = [];
        
        allNamesWithExtension.forEach(file => {
            allNames.push(file);
        });
        
        // Sort: '10' is smaller than '5' else
        allNames.sort((a, b) => {
            return path.parse(a).name - path.parse(b).name;
        });

        res.json(allNames);
    });

    return router;
}