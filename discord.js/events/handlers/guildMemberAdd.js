module.exports = (bot) => {
	bot.on('guildMemberAdd', (member) => {
		greeting.newMember(member);
	});
};
