const path = require("path");

// TODO: Get from database
const userIds = require(path.join(global.discordRoot, '/config/ids')).users;
const volume = require(path.join(global.discordRoot, '/config/sounds')).volume;
const greetingsPath = '/assets/sounds/greetings/';

class GreetingHandler {
    voiceChannelJoin(newState) {
        // Get array of all IDs
        var idArr = Object.values(userIds);

        // If user is in array
        if (idArr.includes(newState.member.id)) {
            const dirs = fs.getDirectories(greetingsPath);
            const dir = dirs.find((currentDir) => currentDir == newState.member.id);

            // Ignore users without a greeting
            if (!dir) return;

            newState.channel
                .join()
                .then((connection) => {
                    const file = fs.getRandomFileFromDirectory(
                        greetingsPath,
                        dir
                    );
                    const fullPath =
                        __dirname +
                        '/../..' +
                        greetingsPath +
                        newState.member.id +
                        '/' +
                        file;

                    newState.setMute(true);

                    const dispatcher = connection.play(fullPath);
                    dispatcher.setVolume(volume);

                    dispatcher.on('finish', () => newState.setMute(false));
                })
                .catch(console.log);
        }
    }

    voiceChannelLeft(oldState) {
        // TODO: Get 'disconnected' sound from database
        oldState.channel.join().then((connection) => {
            connection
                .play(
                    path.join(
                        global.appRoot,
                        greetingsPath,
                        '/disconnected.wav'
                    )
                )
                .setVolume(volume - 0.4);
        });
    }
}

module.exports = GreetingHandler;
