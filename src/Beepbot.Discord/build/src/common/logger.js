"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk = require("chalk");
class Logger {
    constructor() {
        require('console-stamp')(console, {
            pattern: 'dd/mm/yyyy HH:MM:ss',
            colors: {
                stamp: 'yellow',
                label: 'white',
                metadata: 'green',
            },
        });
        process.on('unhandledRejection', console.error);
    }
    error(msg) {
        console.log(chalk.red("ERROR\t") + msg);
    }
    info(msg) {
        console.log(chalk.white("INFO\t") + msg);
    }
    success(msg) {
        console.log(chalk.green("SUCCESS\t") + msg);
    }
    static getInstance() {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    }
}
exports.default = Logger;
