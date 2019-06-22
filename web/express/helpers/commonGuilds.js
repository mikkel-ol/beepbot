module.exports = (bot, user) => {
	const servers = [];
	const botGuilds = bot.guilds.array();

	// TODO: Improve quadratic
	for (let i = 0; i < botGuilds.length; i++) {
		for (let j = 0; j < user.guilds.length; j++) {
			if (botGuilds[i].id == user.guilds[j].id) {
				let members = botGuilds[i].members
					.map(member => member.user)
					.filter(user => !user.bot)
					.map(user => {
                        delete user.bot;
                        delete user.lastMessage;
                        delete user.lastMessageID;
                        return user;
                    });
                
                let channels = botGuilds[i].channels
                    .map(channel => {
                        return {
                            id: channel.id,
                            type: channel.type,
                            name: channel.name
                        };
                    });

				servers.push({
					id: botGuilds[i].id,
					name: botGuilds[i].name,
					icon: botGuilds[i].icon,
					members: members,
					channels: channels
				});

				break;
			}
		}
	}

	return servers;
};
