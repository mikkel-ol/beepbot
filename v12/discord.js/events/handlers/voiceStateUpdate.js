class VoiceStateUpdateHandler {
    subscribe(bot) {
        bot.on('voiceStateUpdate', (oldState, newState) => {
            // Ignore bot voice state update
            if (oldState.member.user.bot) return;

            // Play sound when the boys join a channel (and they were not in one before)
            else if (
                !oldState.channel &&
                newState.channel
            )
                return global.greeting.voiceChannelJoin(newState);

            // Leave voice channel if bot is last one there
            else if (
                oldState.channel &&
                !newState.channel &&
                oldState.channel.members.size === 1
            )
                return oldState.channel.leave();

            // Go with the people!
            else if (
                oldState.channel &&
                oldState.channel.members.size === 1 &&
                newState.channel
            )
                return newState.channel.join();

            // User left channel
            else if (
                oldState.channel &&
                !newState.channel &&
                oldState.channel.members.size > 0
            )
                return global.greeting.voiceChannelLeft(oldState);
        });
    }
}

module.exports = VoiceStateUpdateHandler;
