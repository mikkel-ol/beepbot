const   Express = require('express'),
        router = Express.Router(),
        passport = require('passport'),
        request = require('request'),
        scopes = ['identify', 'email', 'guilds'];

const commonGuilds = [];

// Get homepage
router.get('/', (req, res, next) => {
  if (req.isAuthenticated()) res.redirect('/soundboard');
  else next();
}, passport.authenticate('discord', { scope: scopes }), function(req, res) {res.direct('/soundboard');});




// Callback
router.get('/callback', passport.authenticate('discord', {
  failureRedirect: '/error'
}), (req, res, next) => {
  const user = req.user;
  const url = 'http://' + req.headers.host + '/serverlist';
  const bearer = {
    'auth': {
      'bearer': '1234',
      'sendImmediately': false
    }};

  // Make a GET request to get server list
  request(url, (error, res, body) => {
    const botGuilds = JSON.parse(body);

    // Find common guilds
    commonGuilds.length = 0;
    for (var i = 0; i < user.guilds.length; i++) {
      for (var l = 0; l < botGuilds.length; l++) {
        if (user.guilds[i].id == botGuilds[l].id) {
          user.guilds[i].icon = botGuilds[l].icon_URL;
          commonGuilds.push(user.guilds[i]);
        }
      }
    }

    next();
  });
}, (req, res, next) => {

  // Check if user and bot share any servers
  if (commonGuilds.length == 0) res.redirect('/noguilds');
  else {
    req.session.commonGuilds = commonGuilds;
    const id = commonGuilds[0].id;
    const url = "http://" + req.hostname + "/channels";

    // Get channels from server by ID
    request.post(url, {form: {id}}, (error, response, body) => {
      req.session.textChannels = JSON.parse(body).text;
      req.session.voiceChannels = JSON.parse(body).voice;

      next();
    });
  }
}, (req, res) => {
  const url = "http://" + req.hostname + "/soundlist";

  // Get soundboard files
  request.get(url, (error, response, body) => {
    req.session.soundList = JSON.parse(body);
    res.redirect('/soundboard');
  })

} );

module.exports = router;
