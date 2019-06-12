const commando = require('discord.js-commando');

class VolumeCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'volume',
			group: 'control',
			memberName: 'volume',
			description: 'Show or set the volume if the bot is speaking'
		});
	}

	async run(message, args) {
		if (message.guild.voiceConnection) {
			if (!message.guild.voiceConnection.speaking) { return message.channel.send("Nothing is playing.."); }

			else {
				if (!args) { return message.channel.send(`Current volume is **${message.guild.voiceConnection.dispatcher.volume*100}%**`); }
				if ((args == parseInt(args)) && args >= 0 && args <= 100) {
					message.guild.voiceConnection.dispatcher.setVolume(args / 100);
					return message.channel.send(`Volume set to **${message.guild.voiceConnection.dispatcher.volume*100}%**`);
				}
				else return message.channel.send("Volume must be a number between 0 and 100.");
			}

		}
		else return message.channel.send("Nothing is playing..");
	}
}

module.exports = VolumeCommand;
