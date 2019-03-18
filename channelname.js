const {	CHANNEL_CHANGE_MIN,
		CHANNEL_CHANGE_MAX,
		CHANNEL_EMOJIS } 	= require('./config');

let 	newEmoji;


function setChannelNames(bot) {
	const guild = bot.guilds.get('318685555997278210');
	const voiceChannels = guild.channels.filter(channel => channel.type == "voice");
	const emojis = [];

	// Iterate through all voice channels
	for (const [id, channel] of voiceChannels) {
		// Get new, random emoji from array
		newEmoji = CHANNEL_EMOJIS[Math.floor(Math.random() * CHANNEL_EMOJIS.length)];

		// Avoid duplicates
		while (emojis.includes(newEmoji)) newEmoji = CHANNEL_EMOJIS[Math.floor(Math.random() * CHANNEL_EMOJIS.length)];

		// Set new name with random emoji
		channel.setName("# " + newEmoji)
			.then(newChannel => {})
			.catch(console.error);

		// Save emoji to array
		emojis.push(newEmoji);
	}
	console.log("Changed names of voice channels");
}

function loop(bot) {
	const delay = Math.round(Math.random() * (CHANNEL_CHANGE_MAX - CHANNEL_CHANGE_MIN)) + CHANNEL_CHANGE_MIN;

	setTimeout(function() {
		setChannelNames(bot);
		loop(bot); // Calls itself when done (does stack up)
	}, delay);
}

module.exports = { loop }
