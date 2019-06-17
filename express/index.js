// Set express folder root
global.expressRoot = global.appRoot + '/express';

const Express = require('express'),
	session = require('express-session'), // TODO: Save session data in mongo (leaks atm)
	server = Express(),
	history = require('connect-history-api-fallback'),
	bodyParser = require('body-parser'),
	expressValidator = require('express-validator');

const config = require('./config/app'),
	secret = require('./config/secret'),
	messages = require('./config/messages'),
	passport = require('./passport'),
	routes = require('./routes');

	

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

// TODO: Might need to setup session differently
server.use(
	session({
		secret: secret,
		saveUninitialized: false,
		resave: false,
		unset: 'destroy'
	})
);

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

module.exports = {
	start: () => {
		passport(server);

		server.use(routes());

		// SPA fallback catching
		// Will serve any unknown routes as "/"
		// TODO: Currently not working
		server.use(history());

		server.use(Express.static(global.expressRoot + '/dist'));

		server.listen(config.port, () => {
			console.log(messages.ready);
		});

		return server;
	}
};
