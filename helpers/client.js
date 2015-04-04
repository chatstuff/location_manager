// var locationModel = require('../models/location.js');

var validateClientsNearClientReq = function(req, callback){
  if (!req.client_id){
    callback(new Error("client_id not set"));
  }
  else{
    callback(null);
  }
}

module.exports = {
  validateClientsNearClientReq: validateClientsNearClientReq
};