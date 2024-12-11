var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');



var indexRouter = require('./routes/index');
var userSignup = require('./routes/signup');
var userLogin = require('./routes/login');
var userData = require('./routes/users');
var productsRouter = require('./routes/products');

var app = express();
const db = require('./database/db')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// const expressLayouts = require('express-ejs-layouts');
// //layout setup
// app.use(expressLayouts);
// app.set('layout', 'layouts/main-layout');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/signup', userSignup);
app.use('/login', userLogin);
app.use('/users', userData);
app.use('/getUser', indexRouter);
app.use('/aboutus', indexRouter);
app.use('/products', productsRouter); //products routes

 //import for products routes
// other codes.

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
