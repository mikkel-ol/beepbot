class ReadyHandler {
    subscribe(bot) {
        global.logger.success('Beep Bot - fired up and ready to serve!');
    }
}

module.exports = ReadyHandler;