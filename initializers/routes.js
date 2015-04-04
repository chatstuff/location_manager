//not able to work it out yet, use app.js.

var app = require('express')();
var routes = require('../routes/index');
var location = require('../routes/location');

app.use('/', routes);
app.use('/location', location);
