const commando = require('discord.js-commando');

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
		if (!message.member.roles.has("385745444988256258")) { return message.channel.send("You're too much of a peasant to be able to do that!"); }

		var count = 5;
		if (args) {
			count = (parseInt(args, 10) + 1);
		}

	    if(!count || count < 2 || count > 50) { return message.channel.send("Please provide a number between 2 and 50!"); }

	    const fetched = await message.channel.fetchMessages({limit: count});

	    /*
	    for (var i = 0; i < fetched.size; i++) {

	    }
	    */

	    message.channel.bulkDelete(fetched)
	      .catch(error => message.channel.send(`Couldn't delete messages because of: ${error}`));
	}
}

module.exports = PurgeCommand;
