"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const fs = require("fs");
const const_1 = require("./const");
class Fs {
    static isDirectory(source, name) {
        return fs.lstatSync(path.resolve(const_1.appRoot, source, name)).isDirectory();
    }
    static getDirectories(source) {
        return fs
            .readdirSync(path.resolve(const_1.appRoot, source))
            .filter((name) => this.isDirectory(source, name));
    }
    static getSoundboardFileByName(source) {
        const files = this.getFilesFullPath('soundboard');
        return files.find((filenameWithExtension) => this.getFileName(filenameWithExtension) == source);
    }
    static getFiles(source) {
        return fs
            .readdirSync(path.resolve(const_1.appRoot, source))
            .filter((name) => !this.isDirectory(source, name));
    }
    static getFilesFullPath(source) {
        return fs
            .readdirSync(path.resolve(const_1.appRoot, source))
            .filter((name) => !this.isDirectory(source, name))
            .map((name) => path.join(const_1.appRoot, source, name));
    }
    static getFileName(source) {
        return path.basename(source).replace(/\.[^/.]+$/, '');
    }
    static getRandomFileFromDirectory(dirPath, name) {
        let files = fs.readdirSync(path.resolve(const_1.appRoot, dirPath, name));
        let random = files[Math.floor(Math.random() * files.length)];
        return random;
    }
}
exports.default = Fs;
