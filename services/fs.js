const { lstatSync, readdirSync } = require('fs');

function isDirectory(source, name) {
    return lstatSync(__dirname + '/..' + source + name).isDirectory();
}

function getDirectories(source) {
    return readdirSync(__dirname + '/..' + source).filter(name => isDirectory(source, name));
}

function getRandomFileFromDirectory(path, name) {
    var files = readdirSync(__dirname + '/..' + path + name);

    var random = files[Math.floor(Math.random() * files.length)];

    return random;
}

module.exports = {
	isDirectory,
    getDirectories,
    getRandomFileFromDirectory
};
