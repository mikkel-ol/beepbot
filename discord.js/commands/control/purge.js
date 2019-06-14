const path = require('path');

const 
	commando = require('discord.js-commando'),
	messages = require(path.join(global.discordRoot, '/config/messages'))


class PurgeCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'purge',
			group: 'control',
			memberName: 'purge',
			description: 'Purge/delete last sent messages. Default is the last 5 messages, takes an argument up to 50'
		});
	}

	async run(message, args) {
		// TODO: Set role ID's dynamically
		if (!message.member.roles.has("589093915395620898")) 
			return message.channel.send(messages.permissions.missing);

		var count = 5;
		if (args) {
			count = (parseInt(args, 10) + 1);
		}

		if(!count || count < 2 || count > 50) 
			return message.channel.send("Please provide a number between 2 and 50");

	    const fetched = await message.channel.fetchMessages({limit: count});

	    message.channel.bulkDelete(fetched)
	      .catch(error => message.channel.send(`Couldn't delete messages: ${error}`));
	}
}

module.exports = PurgeCommand;
