var locationModel = require('../models/location.js');


var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/', function(req, res, next) {
  var location = new locationModel.Location
  location.loc[0] = 1.34;
  location.loc[1] = 3.54;
  logger.info(location);
  location.save(function(err, saved_location){
    if (err){
      logger.error('An error occurred while saving the location: ' + JSON.stringify(location));
      res.status(422).end();
    }
    else {
      logger.info('Successfully saved location: ' + JSON.stringify(saved_location));
      res.status(201).end(JSON.stringify(location));
    }
  });
});

module.exports = router;
