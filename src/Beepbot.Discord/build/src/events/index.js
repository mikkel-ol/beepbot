"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("../common/fs");
class Events {
    static attach(bot) {
        const handlers = fs_1.default.getFilesFullPath('events/handlers');
        handlers.forEach((handlerFile) => {
            const handler = require(handlerFile).default;
            handler.subscribe(bot);
        });
    }
}
exports.default = Events;
