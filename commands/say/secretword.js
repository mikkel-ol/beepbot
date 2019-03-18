const commando = require('discord.js-commando');

class SecretWordCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'secretword',
			group: 'say',
			memberName: 'secretword',
			description: 'Tells the secret word!'
		});
	}

	async run(message, args) {
    var your_drink;

    var reverse = (s) => {
      return s.split("").reverse().join("");
    }

    var bartender = {
      str1: "ers",
      str2: reverse("rap"),
      str3: "amet",
      request: function(preference) {
        return preference + ".Secret word: " + this.str2 + this.str3 + this.str1;
      }
    }

    message.channel.send("**Code prints:** " + bartender.request(your_drink));
	}
}

module.exports = SecretWordCommand;
