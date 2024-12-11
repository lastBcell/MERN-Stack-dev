var express = require('express');
var router = express.Router();
const User = require('../model/userModel');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// for getting data from db
router.get('/getUser', function (req,res) {
  User.find().then(data => {
    res.render('user', {data:data})

  }).catch(error => {
    console.error(error);
    
  });
})

 
router.get('/aboutus', function (req,res) {
  res.render('aboutus')
})

module.exports = router;
