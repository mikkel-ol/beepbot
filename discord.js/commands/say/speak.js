const commando = require('discord.js-commando');

let messages = [];

class SpeakCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'speak',
			group: 'say',
			memberName: 'speak',
			description: 'Speak with TTS'
		});
	}

	async run(message, args) {
		
	}
}

module.exports = SpeakCommand;
