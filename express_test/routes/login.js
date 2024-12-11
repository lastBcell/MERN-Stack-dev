var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  
  res.render('login',{tittle: ''});
});


router.get('/:id', function(req, res, next) {
  var title = req.params.id
  res.render('login', { tittle:title });
});

module.exports = router;
