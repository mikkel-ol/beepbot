const 
    Express = require('express'),
    server = Express();

server.post('/soundboard/play', (req, res) => {
	if (!req.body.file) return res.send("No file attribute found");
	const file = Number(req.body.file);
	if (isNaN(file)) return res.send("Not a number");
	else if (file < 0 || file > soundboardFiles.length - 1) res.send("Out of range");
	else {
		soundboard.play(soundboardFiles[file - 1], voiceChannel1);
	}
})

server.post('/soundboard/changevc', (req, res) => {
	const guildID = req.body.guildID;
	const vcID = req.body.vcID;
	if (isNaN(vcID)) return res.send("Not a number");

	const guild = bot.guilds.get(guildID);
	if (!guild) return res.send("Couldn't get guild");
	const vc = guild.channels.filter(channel => channel.type == "voice").get(vcID);
	if (!vc) return res.send("Couldn't get the voice channel");
	else {
		voiceChannel1 = vc;
		vc.join();
	}
})

server.get('/soundlist', (req, res) => {
	res.send(soundboardFiles);
})


server.get('/soundboard/stop', function (req, res) {
	if (voiceChannel1.connection) {
		if (voiceChannel1.connection.speaking) return voiceChannel1.connection.dispatcher.end();
	} else return;
});

server.get('/soundboard/kill', function (req, res) {
	if (voiceChannel1.connection) return voiceChannel1.connection.disconnect();
	else return;
});



// Send back list of all guilds for bot
server.get('/serverlist', (req, res, next) => {
	// Auth check
	if (req.headers.authorization == "Bearer 1234") {}
	next();
}, (req, res) => {
	const guildArray = Array.from(bot.guilds.values());
	let i = 0;

	bot.guilds.forEach((value, key) => {
		guildArray[i].icon_URL = value.iconURL;
		i++;
	});

	res.send(guildArray);
});

// Send back text- and voice channels for given guild ID
server.post('/channels', (req, res) => {
	const allTextChannels = [];
	const allVoiceChannels = [];

	const guild = bot.guilds.get(req.body.id);

	for (const [id, channel] of guild.channels.filter(channel => channel.type == "text")) allTextChannels.push({
		name: channel.name
	});
	for (const [id, channel] of guild.channels.filter(channel => channel.type == "voice")) allVoiceChannels.push({
		name: channel.name,
		id: channel.id
	});

	const allChannels = {
		text: allTextChannels,
		voice: allVoiceChannels
	}

	res.send(allChannels);
});