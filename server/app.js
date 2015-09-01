var config = require('./config/config.js');
var express = require('express');
var session  = require('express-session');
var RedisStore = require('connect-redis')(session);
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var app = express();

app.use(favicon(path.join(__dirname, 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser(config.sessionOptions.secret));
app.use(express.static(path.join(__dirname, './../client')));

// Sessions/PassportJS/Authentication
require('./config/passport.js')(passport);
var sessionOptions = config.sessionOptions;
// sessionOptions.store = new RedisStore(); // TODO set up redis store
app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());

// set routes
require('./routes/index')(app, passport);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    console.log(err.stack);

    res.status(err.status || 500);
    res.json('error in development', {
      message: err.stack,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json('error in production', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
