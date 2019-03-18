// This is constantly constant
const
	// File System
	fs = require('fs'),

	// Discord.js
	Discord = require('discord.js-commando'),
	bot = new Discord.Client(),

	// Express
	Express = require('express'),
	server = Express(),
	session = require('express-session'),
	expressValidator = require('express-validator'),

	// Handlebars
	exphbs = require('express-handlebars'),
	hbs = exphbs.create({
		helpers: {
			serverAvatar: (server) => {
				return avatarGen(server);
			},
			id: (soundfile) => {
				return soundfile.substring(0, 3)
			},
		},
		defaultLayout: 'layout'
	}),

	// Parsers
	bodyParser = require('body-parser'),

	// Passport
	passport = require('passport'),
	scopes = ['identify', 'email', 'guilds'],
	DiscordStrategy = require('passport-discord').Strategy,

	// Scheduler
	schedule = require('node-schedule'),

	// Custom
	soundboard = require('./soundboard'),
	activity = require('./activity'),
	channelname = require('./channelname'),
	greeting = require('./greeting'),
	fourtwenty = require('./fourtwenty'),

	{
		WEBPORT,
		BOT_READY,
		EXPRESS_READY,
		DEFAULT_VOLUME,
		SOUNDPATH
	} = require('./config'),

	{
		TOKEN
	} = require('./token');

// Add timestamps in front of log messages
require('console-stamp')(console, {
	pattern: 'dd/mm/yyyy HH:MM:ss',
	colors: {
		stamp: 'yellow',
		label: 'white',
		metadata: 'green'
	}
});







/**************************************************************

					HERE COMES EXPRESS SHIT

****************************************************************/

// View engine
server.set('views', __dirname + '/views');
server.engine('handlebars', hbs.engine);
server.set('view engine', 'handlebars');

// BodyParser middleware
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
	extended: false
}));

// Static files location
server.use(Express.static(__dirname + '/public'));

// Session
server.use(session({
	secret: 'thebestserver-period',
	saveUninitialized: false,
	resave: false,
	unset: 'destroy'
}))

// Passport initialize
server.use(passport.initialize());
server.use(passport.session());

// Set up Passport
passport.use(new DiscordStrategy({
	clientID: '352214774479847435',
	clientSecret: '7fQDyJLdnUlG3H-6JaiHzYTI9ikNqxCk',
	callbackURL: 'http://beepbot.dk/auth/callback',
	scope: scopes
}, function (accessToken, refreshToken, profile, callback) {

	// Do stuff with tokens here

	process.nextTick(function () {
		return callback(null, profile);
	});
}));

// Serialize user; save user
passport.serializeUser(function (user, done) {
	done(null, user);
});
// And reverse
passport.deserializeUser(function (obj, done) {
	done(null, obj);
});

// Validator
server.use(expressValidator({
	errorFormatter: function (param, msg, value) {
		let namespace = param.split("."),
			root = namespace.shift(),
			formParam = root;

		while (namespace.length) {
			formParam += '[' + namespace.shift() + ']';
		}
		return {
			param: formParam,
			msg: msg,
			value: value
		};
	}
}));

// Route it
server.use('/', require('./routes/index'));
server.use('/soundboard', require('./routes/soundboard'));
server.use('/users', require('./routes/users'));
server.use('/auth', require('./routes/auth'));
server.use('/noguilds', require('./routes/noguilds'));
server.use('/error', require('./routes/error'));






















// Create groups of commands
bot.registry.registerGroups([
	['random', 'Random'],
	['say', 'Say'],
	['control', 'Control'],
	['poll', 'Poll']
])
// Where are my commands?!
bot.registry.registerCommandsIn(__dirname + "/commands");
// When a user types !help all commands are returned
bot.registry.registerDefaults();












// I MADE AN API
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






// Route errors (custom 404 yay)
server.use((req, res) => {
	res.status(404);
	res.sendFile(__dirname + '/views/404.html');
})
server.use((req, res) => {
	res.status(500);
	res.sendFile(__dirname + '/views/500.html');
})















// Create an event listener for messages
bot.on('message', message => {
	// Ignore messages from bots
	if (message.author.bot) return;

	// Mr. Mad
	if (message.content.match(/matias/i) || message.content.match(/fischer/i)) {
		const number = Math.floor(Math.random() * 4),
			{
				FISCHER_REPLY1,
				FISCHER_REPLY2
			} = require('./config');

		if (number == 3) {
			return message.channel.send(FISCHER_REPLY1);
		} else {
			return message.channel.send(FISCHER_REPLY2);
		}
	}

	// 9gag
	if (message.content.match(/9gag.com/i)) {
		const {
			GAG_REPLIES
		} = require('./config');
		if (Math.floor(Math.random() * 2) === 0) {
			return message.channel.send(GAG_REPLIES[Math.floor(Math.random() * GAG_REPLIES.length)]);
		} else return;
	}

	// What does the fox say
	if (message.content.match(/what does the fox say/i)) {
		const {
			FOX_REPLIES
		} = require('./config');
		return message.channel.send(FOX_REPLIES[Math.floor(Math.random() * FOX_REPLIES.length)])
	}
});

// Create an event listener for when a user changes channel (e.g. joins/leaves/changes/mutes)
bot.on('voiceStateUpdate', (oldMember, newMember) => {
	// Play sound when the boys join a channel (and they were not in one before)
	if (oldMember.voiceChannel === undefined && newMember.voiceChannel !== undefined) return greeting.voiceJoin(newMember);
	// Leave voice channel if bot is last one there
	else if (oldMember.voiceChannel.connection && !newMember.voiceChannel && oldMember.voiceChannel.members.size === 1) return oldMember.voiceChannel.leave();
	// Go with the people!
	else if (oldMember.voiceChannel.connection && oldMember.voiceChannel.members.size === 1 && newMember.voiceChannel) return newMember.voiceChannel.join();
});

// Create an event listener for when a new guild member joins
bot.on('guildMemberAdd', member => {
	greeting.newMember(member);
});



// Tell 'em it's 420/1620
schedule.scheduleJob('20 16,4 * * *', () => {
	fourtwenty.tell(voiceChannel1);
});



// Ready check
bot.on('ready', () => {
	voiceChannel1 = bot.guilds.get('318685555997278210').channels.filter(channel => channel.type == "voice").first(); // First voice channel on the OG server
	// Get array of files for soundboard
	fs.readdir("./sounds/soundboard", (err, files) => {
		soundboardFiles = files;
	});
	// Start activity status loop
	activity.loop(bot);
	// Start channel name change loop
	channelname.loop(bot);


	console.log(BOT_READY);
});





let voiceChannel1;
var soundboardFiles;

// Log the bot in
bot.login(TOKEN);
// Express! Listen!
server.listen(WEBPORT, () => {
	const {
		BASH_CYAN,
		BASH_DEFAULT
	} = require('./config');
	console.log(EXPRESS_READY + BASH_CYAN + WEBPORT + BASH_DEFAULT);
});
// Log all unhandled promise rejection
process.on("unhandledRejection", console.error);











/**************************
	  Helper functions
***************************/

// Generates HTML for each server icon
function avatarGen(server) {
	if (server.icon === null) {
		const names = server.name.split(" ");
		let acronym = "";
		// Get first three letters in server name and save in acronym
		for (let i = 0; i < 3; i++) {
			acronym += names[i].substr(0, 1); // Get first character and append to acronym string
		}
		return "<a href='#' style='font-size: 16px;' onclick='isSelected(this)'>" + acronym + "</a>"
	} else {
		return "<a href='#' style='background-image: url(&apos;" + server.icon + "&apos;);' onclick='isSelected(this)'></a>"
	}
}