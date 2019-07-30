// Set express folder root
global.expressRoot = global.appRoot + '/express';

const path = require('path');

const https = require('https'),
	http = require('http'),
	fs = require('fs'),
	Express = require('express'),
	session = require('express-session'), // TODO: Save session data in mongo (leaks atm)
	server = Express(),
	history = require('connect-history-api-fallback'),
	bodyParser = require('body-parser'),
	expressValidator = require('express-validator'),
	MongoStore = require('connect-mongo')(session);

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
		resave: false,
		store: new MongoStore({ url: require(path.join(global.appRoot, '/database/config')).url + '/session'})
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

		let webServer = undefined;

		switch (process.env.NODE_ENV) {
			case 'production':
				const credentials = {
					key: fs.readFileSync(config.cert.privatekey),
					cert: fs.readFileSync(config.cert.certificate),
					ca: fs.readFileSync(config.cert.authority)
				};
				webServer = https.createServer(credentials, server);

				// Redirect HTTP to HTTPS
				http
					.createServer(function(req, res) {
						res.writeHead(301, {
							Location: 'https://' + req.headers['host'].replace(8080, config.port) + req.url
						});
						res.end();
					})
					.listen(8080);

				break;

			case 'dev':
				webServer = http.createServer(server);
				break;

			default:
				break;
		}

		webServer.listen(config.port, () => {
			console.log(messages.ready);
		});

		return server;
	}
};
