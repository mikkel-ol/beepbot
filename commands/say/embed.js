const commando = require('discord.js-commando');
const Discord = require('discord.js');

class EmbedCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'embed',
			group: 'say',
			memberName: 'embed',
			description: 'Embed testing'
		});
	}

	async run(message, args) {
    const embed = new Discord.RichEmbed()
      .setTitle("Test")
      .setColor([255,140,255])
      .setURL("http://google.com/");

    message.channel.send(embed);
	}
}

module.exports = EmbedCommand;
