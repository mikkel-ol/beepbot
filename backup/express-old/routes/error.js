const   Express = require('express'),
        router = Express.Router();

// Get homepage
router.get('/', (req, res) => {
  res.render('error');
})

module.exports = router;
