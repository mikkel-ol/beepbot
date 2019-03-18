const commando = require('discord.js-commando');

class PollCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'poll',
			group: 'poll',
			memberName: 'poll',
			description: 'Starts a poll'
		});
	}

	async run(message, args) {
		if (!args) { return message.channel.send("What do you want to vote about?"); }
		if (args.indexOf("?") == -1) { return message.channel.send("You need to end your question with \"**?**\""); }
		if (args.slice(args.indexOf("?")+1).replace(/ /g,'').length == 0) { return message.channel.send("Need answers to your question"); }

		let numbers = ["1⃣", "2⃣", "3⃣", "4⃣", "5⃣", "6⃣", "7⃣", "8⃣", "9⃣", "🔟"];

		let answersToMessage = "";

		let question = args.slice(0, args.indexOf("?")+1);
		question = question.charAt(0).toUpperCase() + question.substr(1);

		let answers = args.slice(args.indexOf("?")+1).split(","); // Cut whitespace and make array
		for(var i=0; i < answers.length; i++) {
    	    answers[i] = answers[i].trim().charAt(0).toUpperCase() + answers[i].trim().substr(1);

    	    answersToMessage = answersToMessage.concat(numbers[i] + " " + answers[i]);
    	    answersToMessage = answersToMessage.concat(`
`);
    	}

    	if (answers.length > 10) { return message.channel.send("You can only add up to 10 answers."); }

    	message.delete();

    	return message.channel.send(`
${message.member.displayName} spurgte: **${question}**

${answersToMessage}
		`)
		.then(async message => {
			for (var i=0; i < answers.length; i++) {
				await message.react(numbers[i]).then(msgReaction => {}).catch(console.error);
			}
		})
		.catch(console.error);
	}
}

module.exports = PollCommand;