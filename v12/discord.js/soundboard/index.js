const emitter = global.emitter;

class Client {
    attach() {
        emitter.on("soundboard/play", file => {
            const handler = require("./handlers/play");

            handler.do(global.bot, file);
        });

        emitter.on("soundboard/stop", () => {
            const handler = require('./handlers/stop');

            handler.do(global.bot);
        })
    }
}

module.exports = {
    Client
};