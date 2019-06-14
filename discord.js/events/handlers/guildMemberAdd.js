const path = require('path');

const greeting = require(path.join(global.discordRoot, '/helpers/greeting'));

module.exports = (bot) => {
	bot.on('guildMemberAdd', (member) => {
		greeting.newMember(member);
	});
};
