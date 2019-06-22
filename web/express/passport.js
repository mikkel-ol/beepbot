const path = require('path');

const 
    passport = require('passport'),
	scopes = [ 'identify', 'email', 'guilds' ],
    DiscordStrategy = require('passport-discord').Strategy,
    client = {
		id: require(path.join(global.discordRoot, '/config/ids')).client,
		secret: require(path.join(global.discordRoot, '/config/secret'))
    },
    config = require('./config/app');

module.exports = (server) => {
	passport.serializeUser((user, done) => done(null, user));
	passport.deserializeUser((obj, done) => done(null, obj));

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

    server.use(passport.initialize());
    server.use(passport.session());
    
    return passport;
};
