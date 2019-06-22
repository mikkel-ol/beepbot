const 
    path = require('path'),
    { lstatSync, readdirSync } = require('fs');

const fs = {
	isDirectory: (source, name) => {
		return lstatSync(global.appRoot + source + name).isDirectory();
	},

	getDirectories: source => {
		return readdirSync(global.appRoot + source).filter(name => fs.isDirectory(source, name));
	},

	getFiles: source => {
        return readdirSync(global.appRoot + source).filter(name => !fs.isDirectory(source, name));
    },

	getRandomFileFromDirectory: (path, name) => {
		var files = readdirSync(global.appRoot + path + name);

		var random = files[Math.floor(Math.random() * files.length)];

		return random;
	}
};

module.exports = fs;
