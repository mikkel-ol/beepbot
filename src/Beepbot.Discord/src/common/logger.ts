import * as chalk from "chalk";

class Logger {
    private static instance: Logger;

    private constructor() {
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

    error(msg: string) {
        console.log(chalk.red("ERROR\t") + msg);
    }

    info(msg: string) {
        console.log(chalk.white("INFO\t") + msg);
    }

    success(msg: string) {
        console.log(chalk.green("SUCCESS\t") + msg);
    }

    public static getInstance(): Logger {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }

        return Logger.instance;
    }
}

export default Logger;
