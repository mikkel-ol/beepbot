const commando = require('discord.js-commando');

class DictateCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'dictate',
			group: 'say',
			memberName: 'dictate',
			description: 'Dictate a message for the bot to say'
		});
	}

	async run(message, args) {
		message.delete();
		message.channel.send(args);
	}
}

module.exports = DictateCommand;