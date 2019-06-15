const fs = require('fs');
const path = require('path');

function isDirectory(source, name) {
    return fs.lstatSync(path.join(__dirname, '/..', source, name)).isDirectory();
}

function getDirectories(source) {
    return fs.readdirSync(path.join(__dirname, '/..', source)).filter(name => isDirectory(source, name));
}

function getRandomFileFromDirectory(dir, name) {
    var files = fs.readdirSync(path.join(__dirname, '/..', dir, name));

    var random = files[Math.floor(Math.random() * files.length)];

    return random;
}

function getRandomAudioFileFromDirectory(dir, name) {
    var files = fs.readdirSync(path.join(__dirname, '/..', dir, name));

    var regexAudioFiles = RegExp('(wav|mp3)');

    let filtered = files.filter(file => regexAudioFiles.test(file.split('.').pop()));

    var random = filtered[Math.floor(Math.random() * filtered.length)];

    return random;
}

module.exports = {
	isDirectory,
    getDirectories,
    getRandomFileFromDirectory,
    getRandomAudioFileFromDirectory
};
