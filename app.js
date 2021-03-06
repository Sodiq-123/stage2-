var createError = require('http-errors');
var express = require('express');
var path = require('path');
var exphbs = require('express-handlebars');
var cookieParser = require('cookie-parser');
var dotenv = require('dotenv').config();
var logger = require('morgan');

var routes = require('./routes/routes');


module.exports = function (app) {
  app.engine('hbs', exphbs.create({
    defaultlayout: 'main',
    layoutsDir: path.join(__dirname, './views'),
    extname: '.hbs',
  }).engine);
  app.set('view engine', 'hbs');

  app.use(logger('dev'));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cookieParser());

// Specify the routes
  app.use(routes);

  app.use('/public/', express.static(path.join(__dirname, './public')));

  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    if (res.status(404)) {
      res.render('error.hbs', {title: "Sorry, page not found"});
    }
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
