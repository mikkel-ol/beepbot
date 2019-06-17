const express = require('express');
const passport = require('passport');

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
				return res.redirect('/');
			});
		})(req, res, next);
	});

	router.get('/logout', (req, res) => {
		req.logout();
		res.redirect('/');
	});

	return router;
};
