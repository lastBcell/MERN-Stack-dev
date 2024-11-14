var express = require('express');
var router = express.Router();

/* GET home login. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'a' });
});

module.exports = router;