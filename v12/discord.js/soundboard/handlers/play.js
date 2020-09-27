const path = require('path');
const config = require(path.join(global.discordRoot, '/config/sounds'));

module.exports = {
    do: (bot, file, vc) => {
        const soundFile = global.fs.getSoundboardFileById(file.id);

        const conn = bot.voice.connections.find(x => x.channel.id == vc);

        conn.play(soundFile).setVolume(file.volume ? file.volume : config.volume);
    },
};
