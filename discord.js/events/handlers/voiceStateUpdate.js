const path = require('path');

const greetings = require(path.join(global.discordRoot, '/helpers/greeting'));

module.exports = (bot) => {
	bot.on('voiceStateUpdate', (oldMember, newMember) => {
		// Ignore bot voice state update
		if (oldMember.user.bot) return;

		// Play sound when the boys join a channel (and they were not in one before)
		else if (oldMember.voiceChannel === undefined && newMember.voiceChannel !== undefined)
			return greetings.voiceChannelJoin(newMember);

		// User left channel
		else if (oldMember.voiceChannel != newMember.voiceChannel && oldMember.voiceChannel.members.size > 0) {
			return greetings.voiceChannelLeft(oldMember);
		}

		// Leave voice channel if bot is last one there
		else if (
			oldMember.voiceChannel.connection &&
			!newMember.voiceChannel &&
			oldMember.voiceChannel.members.size === 1
		)
			return oldMember.voiceChannel.leave();

		// Go with the people!
		else if (
			oldMember.voiceChannel.connection &&
			oldMember.voiceChannel.members.size === 1 &&
			newMember.voiceChannel
		)
			return newMember.voiceChannel.join();
	});
};
