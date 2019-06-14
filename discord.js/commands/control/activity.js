const 	
	commando = require('discord.js-commando'),
	path = require('path'),
	messages = require(path.join(global.discordRoot, '/config/messages'));

class ActivityCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'activity',
			group: 'control',
			memberName: 'activity',
			description: 'Set my activity'
		});
	}

	async run(message, args) {
		if (!message.member.roles.has("589093915395620898") && !message.member.roles.has("403577862944456708") /* <--- "Bot test"-server role*/) 
			return message.channel.send("You're too much of a peasant to be able to do that!");
		
		var type;
		var twitchURL = null;

		args = args.split(" ");

		switch (args[0].toUpperCase()) {
			case "PLAYING":
				type = "PLAYING";
				break;
			case "STREAMING":
				type = "STREAMING";
				break;
			case "LISTENING":
				type = "LISTENING";
				break;
			case "WATCHING":
				type = "WATCHING";
				break;
			default:
				if (!args[0]) return message.channel.send(messages.success + " I need to know what type of activity I'm doing..");
				else return message.channel.send(messages.fail + " That's not something I can do..");
		}

		if (!args[1]) return message.channel.send(messages.fail + ` So you're saying I'm **${args[0]}** but __what__ am I **${args[0]}**?!`);

		var status = args.slice(1).join(" ");

		const url = status.match(/\bhttps?:\/\/\S+/gi);
		if (url != null) {
			twitchURL = status.match(/((http:\/\/(.*\.twitch\.tv\/.*|twitch\.tv\/.*))|(https:\/\/(.*\.twitch\.tv\/.*|twitch\.tv\/.*)))/i);
		}

		const options = new Object();
		options.type = type;

		if (twitchURL != null) {
			options.url = twitchURL[0];
			status = status.substring(0, status.lastIndexOf(" "));
		}

		message.guild.client.user.setActivity(status, options)
			.then(presence => {
				if (type === "LISTENING") type = "LISTENING TO";
				message.channel.send(messages.success + ` Succesfully updated my status to: ${type.charAt(0)}${type.slice(1).toLowerCase()} **${status}**`);
				message.delete();
			})
			.catch(console.error);
	}
}

module.exports = ActivityCommand;
