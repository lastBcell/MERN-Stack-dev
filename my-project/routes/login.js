var express = require('express');
var router = express.Router();

/* GET home login. */
router.get('/:vara', function(req, res, next) {
  const a = req.params.vara;
  console.log(a)
  res.render('login', { title: a });
});

module.exports = router;