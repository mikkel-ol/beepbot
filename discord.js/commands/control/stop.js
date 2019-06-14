const commando = require('discord.js-commando');

class StopCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'stop',
			group: 'control',
			memberName: 'stop',
			description: 'Stops a current voice connection'
		});
	}

	async run(message, args) {
		if (message.guild.voiceConnection) { 
			message.delete();
			message.guild.voiceConnection.disconnect(); 
		}
		else { message.channel.send("Not in a voice connection..") }
	}
}

module.exports = StopCommand;