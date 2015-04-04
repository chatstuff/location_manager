console.log('Loading environment: ' + process.env.NODE_ENV);

envFile = "./.env." + process.env.NODE_ENV;
console.log('Loading env file: ' + envFile);
require('dotenv').config({path: envFile});

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
morgan.token('body', function(req, res) { 
  return JSON.stringify(req.body); 
});
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" :body', { stream: fs.createWriteStream(process.env.ACCESS_LOG_FILE_PATH, {flags: 'a'}) }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Initialize new routes here, was unable to move it into separate initializer file
var routes = require('./routes/index');
var location = require('./routes/location');
var client = require('./routes/client');
app.use('/', routes);
app.use('/location', location);
app.use('/client', client);

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

// Added all custom initializers
require('./initializers/all.js')

module.exports = app;
