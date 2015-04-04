var mongoose = require('mongoose');

var authStr = '';
if (process.env.MONGO_USERNAME && process.env.MONGO_PASSWORD){
	var authStr = process.env.MONGO_USERNAME + ":" + process.env.MONGO_PASSWORD + "@";
}
var uri = "mongodb://" + authStr + process.env.MONGO_HOST + ":" + process.env.MONGO_PORT + "/" + process.env.MONGO_DATABASE;
var options = {
  db: { native_parser: true },
  server: { poolSize: 10, socketOptions: {keepAlive: 1} },
}
mongoose.connect(uri, options);
