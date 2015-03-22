var mongoose = require('mongoose');

var uri = "mongodb://" + process.env.MONGO_USERNAME + ":" + process.env.MONGO_PASSWORD + "@" + process.env.MONGO_HOST + ":" + process.env.MONGO_PORT + "/" + process.env.MONGO_DATABASE;
var options = {
  db: { native_parser: true },
  server: { poolSize: 10, socketOptions: {keepAlive: 1} },
}
mongoose.connect(uri, options);
