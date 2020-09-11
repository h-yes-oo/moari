var express = require('express');
var router = express.Router();

// middleware that is specific to this router
router.use(function(req, res, next) {
  console.log('accounts router');
  next();
});

// define the home page route
router.get('/', function(req, res) {
  res.send('accounts index');
});

// define the about route
router.get('/signup', function(req, res) {
  res.send('accounts signup');
});

module.exports = router;