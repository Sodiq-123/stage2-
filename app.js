var createError = require('http-errors');
var express = require('express');
var path = require('path');
var exphbs = require('express-handlebars');
var cookieParser = require('cookie-parser');
var dotenv = require('dotenv').config();
var logger = require('morgan');

var indexRouter = require('./routes/index');
var contactRouter = require('./routes/users');

var app = express();

module.exports = function (app) {
  app.engine('hbs', exphbs.create({
    defaultlayout: 'main',
    layoutsDir: path.join(__dirname, './views'),
    extname: '.hbs',
  }).engine);
  app.set('view engine', 'hbs');

  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());

// Specify the routes
  app.use('/', indexRouter);
  app.use('/contact', contactRouter);

  app.use('/public/', express.static(path.join(__dirname, './public')));

  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    next(createError(404));
  });

  // error handler
  app.use(function(err, req, res) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
    });

    return app;
};
