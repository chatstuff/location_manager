var locationModel = require('../models/location.js');
var locationHelper = require('../helpers/location.js');

var express = require('express');
var router = express.Router();

router.put('/', function(req, res, next) {
  logger.info("PUT /location body: " + JSON.stringify(req.body));

  locationHelper.makeLocationUpdateObj(req.body, function(err, location){
    if (err){
      res.status(400).end(err.message);
    }
    else {
      logger.debug("Updating location: " + JSON.stringify(location));
      var query = {client_id: location.client_id, client_type: location.client_type}
      locationModel.Location.findOneAndUpdate(query, location, {upsert: true}, function(err, saved_location){
        if (err){
          logger.error('An error occurred while saving the location: ' + JSON.stringify(location) + " error: " + err.message);
          res.status(422).end();
        }
        else {
          logger.info('Successfully saved location: ' + JSON.stringify(saved_location));
          res.status(200).end(JSON.stringify(location));
        }
      });
    }
  });
});

module.exports = router;
