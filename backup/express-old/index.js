// Set express folder root
global.expressRoot = global.appRoot + '/express';

const 
	path = require('path'),
	config = require('./config/app'),
	messages = require('./config/messages'),
	client = {
		id: require(global.appRoot + '/discord.js/config/ids.js').client,
		secret: require(global.appRoot + '/discord.js/config/secret.js')
	};

const 
	Express = require('express'),
	server = Express(),
	session = require('express-session'),
	expressValidator = require('express-validator'),
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
	bodyParser = require('body-parser'),
	passport = require('passport'),
	scopes = ['identify', 'email', 'guilds'],
	DiscordStrategy = require('passport-discord').Strategy;

/**************************
	  Helper functions
***************************/

// Generates HTML for each server icon
function avatarGen(server) {
	if (server.icon === null) {
		const names = server.name.split(' ');
		let acronym = '';
		// Get first three letters in server name and save in acronym
		for (let i = 0; i < 3; i++) {
			acronym += names[i].substr(0, 1); // Get first character and append to acronym string
		}
		return "<a href='#' style='font-size: 16px;' onclick='isSelected(this)'>" + acronym + '</a>';
	} else {
		return (
			"<a href='#' style='background-image: url(&apos;" +
			server.icon +
			"&apos;);' onclick='isSelected(this)'></a>"
		);
	}
}




module.exports = {
	start: () => {
		// View engine
		server.set('views', __dirname + '/views');
		server.engine('handlebars', hbs.engine);
		server.set('view engine', 'handlebars');

		// BodyParser middleware
		server.use(bodyParser.json());
		server.use(
			bodyParser.urlencoded({
				extended: false
			})
		);

		// Static files location
		server.use(Express.static(__dirname + '/public'));

		// Session
		server.use(
			session({
				secret: 'thebestserver-period',
				saveUninitialized: false,
				resave: false,
				unset: 'destroy'
			})
		);

		// Passport initialize
		server.use(passport.initialize());
		server.use(passport.session());

		// Set up Passport
		passport.use(
			new DiscordStrategy(
				{
					clientID: client.id,
					clientSecret: client.secret,
					callbackURL: config.url.callback,
					scope: scopes
				},
				(accessToken, refreshToken, profile, callback) => {
					// Do stuff with tokens here

					process.nextTick(function() {
						return callback(null, profile);
					});
				}
			)
		);

		// Serialize user; save user
		passport.serializeUser(function(user, done) {
			done(null, user);
		});
		// And reverse
		passport.deserializeUser(function(obj, done) {
			done(null, obj);
		});

		// Validator
		server.use(
			expressValidator({
				errorFormatter: function(param, msg, value) {
					let namespace = param.split('.'),
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
			})
		);

		// Route it
		server.use('/', require('./routes/index'));
		server.use('/soundboard', require('./routes/soundboard'));
		server.use('/users', require('./routes/users'));
		server.use('/auth', require('./routes/auth'));
		server.use('/noguilds', require('./routes/noguilds'));
		server.use('/error', require('./routes/error'));

		// Start listening
		server.listen(config.port, () => {
			console.log(messages.ready);
		});
	}
};
