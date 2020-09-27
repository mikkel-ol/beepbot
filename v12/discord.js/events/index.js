const fs = global.fs;
const path = require("path");

class EventDispatcher {
    constructor() {
        this.handlers = fs.getFilesFullPath("/discord.js/events/handlers/");
    }

    attach() {
        this.handlers.forEach(handlerFile => {
            const Handler = require(handlerFile);

            const handler = new Handler();

            handler.subscribe(global.bot);
        })
    }
}

module.exports = EventDispatcher;