import * as path from 'path';
import * as fs from 'fs';
import { appRoot } from './const';

class Fs {
  static isDirectory(source: string, name: string) {
    return fs.lstatSync(path.resolve(appRoot, source, name)).isDirectory();
  }

  static getDirectories(source: string) {
    return fs
      .readdirSync(path.resolve(appRoot, source))
      .filter((name) => this.isDirectory(source, name));
  }

  static getSoundboardFileByName(source: string) {
    const files = this.getFilesFullPath('soundboard');
    return files.find(
      (filenameWithExtension) =>
        this.getFileName(filenameWithExtension) == source,
    );
  }

  static getFiles(source: string) {
    return fs
      .readdirSync(path.resolve(appRoot, source))
      .filter((name) => !this.isDirectory(source, name));
  }

  static getFilesFullPath(source: string) {
    return fs
      .readdirSync(path.resolve(appRoot, source))
      .filter((name) => !this.isDirectory(source, name))
      .map((name) => path.join(appRoot, source, name));
  }

  static getFileName(source: string) {
    return path.basename(source).replace(/\.[^/.]+$/, '');
  }

  static getRandomFileFromDirectory(dirPath: string, name: string) {
    let files = fs.readdirSync(path.resolve(appRoot, dirPath, name));

    let random = files[Math.floor(Math.random() * files.length)];

    return random;
  }
}

export default Fs;
