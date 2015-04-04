var locationModel = require('../models/location.js');

var makeLocationUpdateObj = function(req, callback){
  if (!req.client_id){
    callback(new Error("client_id not set"), null);
  }
  else if (!req.client_type){
    callback(new Error("client_type not set"), null);
  }
  else if(!req.loc){
    callback(new Error("loc not set"), null);
  }
  else if (!req.loc.lat){
    callback(new Error("lat not set"), null);
  }
  else if (typeof req.loc.lat != "number"){
  // else if (!(req.loc.lat instanceof Number)){
    callback(new Error("lat is invalid"), null);
  }
  else if (!req.loc.lng){
    callback(new Error("lng is invalid"), null);
  }
  else if (typeof req.loc.lng != "number"){
    callback(new Error("lng is invalid"), null);
  }
  else if (!req.accuracy){
    callback(new Error("accuracy not set"), null);
  }
  else if (typeof req.accuracy != "number"){
    callback(new Error("accuracy is invalid"), null);
  }
  else if (!req.fix_time){
    callback(new Error("fix_time not set"), null);
  }
  else{
    var location = new locationModel.Location
    location.client_id = req.client_id;
    location.client_type = req.client_type;
    location.loc[0] = req.loc.lng;
    location.loc[1] = req.loc.lat;
    location.accuracy = req.accuracy;
    location.fix_time = req.fix_time;
    callback(null, location);
  }
}

module.exports = {
  makeLocationUpdateObj: makeLocationUpdateObj
};