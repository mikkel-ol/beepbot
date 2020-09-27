const chalk = require("chalk");

class Logger {
    constructor() {
        // Add timestamps in front of log messages
        require('console-stamp')(console, {
            pattern: 'dd/mm/yyyy HH:MM:ss',
            colors: {
                stamp: 'yellow',
                label: 'white',
                metadata: 'green',
            },
        });

        // Log all unhandled promise rejection
        process.on('unhandledRejection', console.error);
    }

    error(msg) {
        console.log(chalk.red("ERROR ") + msg);
    }

    info(msg) {
        console.log(chalk.white("INFO ") + msg);
    }

    success(msg) {
        console.log(chalk.green("SUCCESS ") + msg);
    }
}

module.exports = Logger;
