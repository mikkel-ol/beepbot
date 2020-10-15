"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("../../common/logger");
class ReadyHandler {
    static subscribe() {
        logger_1.default.getInstance().success('Beep Bot - fired up and ready to serve!');
    }
}
exports.default = ReadyHandler;
