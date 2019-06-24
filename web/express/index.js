// Set express folder root
global.expressRoot = global.appRoot + '/web/express';

const https = require('https'),
	fs = require('fs'),
	Express = require('express'),
	session = require('express-session'), // TODO: Save session data in mongo (leaks atm)
	server = Express(),
	history = require('connect-history-api-fallback'),
	bodyParser = require('body-parser'),
	expressValidator = require('express-validator');

const config = require('./config/app'),
	secret = require('./config/secret'),
	messages = require('./config/messages'),
	passport = require('./passport'),
	api = require('./api'),
	routes = require('./routes');

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.use(
	session({
		secret: secret,
		saveUninitialized: false,
		resave: false
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
	start: (bot) => {
		//! CORS in dev, allow
		if (`${process.env.NODE_ENV}` === 'dev') {
			server.use((req, res, next) => {
				res.header('Access-Control-Allow-Origin', req.headers.origin);
				res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
				res.header('Access-Control-Allow-Headers', 'Content-type,Accept,x-access-token,X-Key');
				res.header('Access-Control-Allow-Credentials', 'true');

				if (req.method === 'OPTIONS') {
					res.status(200).end();
				} else {
					next();
				}
			});
		}

		passport(server);

		server.use(api(bot));
		server.use(routes());

		// SPA fallback catching
		// Will serve any unknown routes as "/"
		// TODO: Fix dotRule
		server.use(history());

		server.use(Express.static(global.expressRoot + '/dist'));

		if (process.env.NODE_ENV == 'production') {
			https
				.createServer(
					{
						key: fs.readFileSync('/etc/letsencrypt/live/beepbot.dk/privkey.pem'),
						cert: fs.readFileSync('/etc/letsencrypt/live/beepbot.dk/cert.pem'),
						ca: fs.readFileSync('/etc/letsencrypt/live/beepbot.dk/chain.pem')
					},
					server
				)
				.listen(config.port, () => {
					console.log(messages.ready);
				});
		} else {
			server.listen(config.port, () => {
				console.log(messages.ready);
			});
		}

		return server;
	}
};
