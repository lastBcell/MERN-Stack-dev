var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { tit: 'ajay ' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

router.get('/users', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/createUser', function(req, res) {
  const email = req.body.email
  res.render("form-data",{
  email:email, 
  allData:req.body
 });

});
module.exports = router;
