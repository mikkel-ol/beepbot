const path = require('path');
const { lstatSync, readdirSync } = require('fs');

class Fs {
    isDirectory(source, name) {
        return lstatSync(global.appRoot + source + name).isDirectory();
    }

    getDirectories(source) {
        return readdirSync(global.appRoot + source).filter((name) => fs.isDirectory(source, name));
    }

    getSoundboardFileById(source) {
        const files = this.getFilesFullPath("/assets/sounds/soundboard/");
        return files.find((filenameWithExtension) => this.getFileName(filenameWithExtension) == source);
    }

    getFiles(source) {
        return readdirSync(global.appRoot + source).filter((name) => !fs.isDirectory(source, name));
    }

    getFilesFullPath(source) {
        return readdirSync(global.appRoot + source)
            .filter((name) => !fs.isDirectory(source, name))
            .map((name) => path.join(global.appRoot, source, name));
    }

    getFileName(source) {
        return path.basename(source).replace(/\.[^/.]+$/, '');
    }

    getRandomFileFromDirectory(path, name) {
        let files = readdirSync(global.appRoot + path + name);

        let random = files[Math.floor(Math.random() * files.length)];

        return random;
    }
}

module.exports = Fs;
