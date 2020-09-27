const fs = global.fs;

class LoopsDispatcher {
    constructor() {
        this.loopers = fs.getFilesFullPath('/discord.js/loops/handlers/');
    }

    attach() {
        this.loopers.forEach((looperFile) => {
            const Looper = require(looperFile);

            const looper = new Looper(global.bot);

            looper.run();
        });
    }
}

module.exports = LoopsDispatcher;
