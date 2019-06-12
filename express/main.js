const 
    Express = require('express'),
    server = Express(),
    session = require('express-session'),
    expressValidator = require('express-validator');

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
server.use('/', require('./web/routes/index'));
server.use('/soundboard', require('./web/routes/soundboard'));
server.use('/users', require('./web/routes/users'));
server.use('/auth', require('./web/routes/auth'));
server.use('/noguilds', require('./web/routes/noguilds'));
server.use('/error', require('./web/routes/error'));

// Start listening
server.listen(WEBPORT, () => {
	const {
		BASH_CYAN,
		BASH_DEFAULT
	} = require('./config');
	console.log(EXPRESS_READY + BASH_CYAN + WEBPORT + BASH_DEFAULT);
});






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