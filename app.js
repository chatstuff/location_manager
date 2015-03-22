var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

console.log('Loading environment: ' + process.env.NODE_ENV);

envFile = "./.env." + process.env.NODE_ENV;
console.log('Loading env file: ' + envFile);
require('dotenv').config({path: envFile});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(morgan('combined', { stream: fs.createWriteStream(process.env.ACCESS_LOG_FILE_PATH) }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

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
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

var log4js = require('log4js');
log4js.configure({
    appenders: [
      {
        type: 'file',
        filename: process.env.APP_LOG_FILE_PATH,
        category: 'location_manager'
      }
  ],
    levels: {
          "location_manager":  process.env.APP_LOG_LEVEL
    }
});

GLOBAL.logger = log4js.getLogger('location_manager');

module.exports = app;
