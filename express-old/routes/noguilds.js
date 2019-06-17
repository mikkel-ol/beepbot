const   Express = require('express'),
        router = Express.Router();

// Get homepage
router.get('/', (req, res) => {
  res.render('index');
})

module.exports = router;
