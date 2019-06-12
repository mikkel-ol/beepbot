const commando = require('discord.js-commando');

class DiceRollCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'roll',
			group: 'random',
			memberName: 'roll',
			description: 'Rolls a die'
		});
	}

	async run(message, args) {
		if (!args) { // Roll a single die
			var roll = Math.floor(Math.random() * 6) + 1;
			message.channel.send("I rolled a " + roll + "!");
		}
		else { // Roll the number of dice given as argument
			var roll = 0;
			for (var i = 0; i < parseInt(args); i++) {
				roll += Math.floor(Math.random() * 6) + 1;
			}
			message.channel.send("I rolled a " + roll + "!");
		}
	}
}

module.exports = DiceRollCommand;