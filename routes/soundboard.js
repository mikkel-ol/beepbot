const   Express = require('express'),
        router = Express.Router();

// Get homepage
router.get('/', checkAuth, (req, res) => {
  res.render('soundboard', { servers: req.session.commonGuilds, textchannels: req.session.textChannels, voicechannels: req.session.voiceChannels, soundlist: req.session.soundList });
})

function checkAuth(req, res, next) {
    if (req.isAuthenticated()) next();
    else res.redirect('/auth');
}

module.exports = router;
