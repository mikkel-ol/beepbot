const path = require('path');

const express = require('express');
const passport = require('passport');
const config = require(path.join(global.expressRoot, "/config/app"));

module.exports = () => {
	const router = express.Router();

	router.get(
		'/',
		passport.authenticate('discord', {
			failureRedirect: '/error'
		}),
		(req, res) => {
			res.redirect('/');
		}
	);

	router.get('/callback', (req, res, next) => {
		passport.authenticate('discord', (err, user) => {
			if (err) return next(err);

			if (!user) return res.redirect('/error');

			return req.login(user, (loginErr) => {
				if (loginErr) return next(loginErr);
				return res.redirect(config.url.redirect);
			});
		})(req, res, next);
	});

	router.get('/logout', (req, res) => {
		req.logout();
		res.sendStatus(200);
	});

	return router;
};
