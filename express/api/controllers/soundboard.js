function checkAuth(req, res, next) {
	if (req.isAuthenticated()) next();
	else res.redirect('/auth');
}

module.exports = () => {
	const router = require('express').Router();

	// TODO: Rewrite to Vue.js
	router.get('/', checkAuth, (req, res) => {
		res.render('soundboard', {
			servers: req.session.commonGuilds,
			textchannels: req.session.textChannels,
			voicechannels: req.session.voiceChannels,
			soundlist: req.session.soundList
		});
	});

	return router;
};
