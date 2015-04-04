var locationModel = require('../models/location.js');
var clientHelper = require('../helpers/client.js');

var express = require('express');
var router = express.Router();

router.get('/clients_near_client', function(req, res, next) {
  logger.info("GET /client/clients_near_client query: " + JSON.stringify(req.query));

  clientHelper.validateClientsNearClientReq(req.query, function(err){
    if (err){
      res.status(400).end(err.message);
    }
    else {
      var num = req.query.count ? parseInt(req.query.count) : parseInt(process.env.DEFAULT_CLIENT_COUNT);
      var maxDistance = req.query.max_distance ? parseInt(req.query.max_distance) : parseInt(process.env.DEFAULT_CLIENT_DISTANCE);

      locationModel.Location.findOne({client_id: req.query.client_id, fix_time: {"$gte": new Date((new Date()).getTime() - parseInt(process.env.STALL_INTERVAL * 1000))}}, "loc client_type", function(err, location){
        logger.debug("Location of client: " + JSON.stringify(location));
        locationModel.Location.geoNear(location.loc, {
          maxDistance: maxDistance / 6378137,
          distanceMultiplier: 6378137,
          distanceField: "distance",
          spherical: true,
          num: num
        }, function(err, clients, stats){
          if(err) {
            logger.error("Error occurred in geonear: " + err.message);
            res.status(422).end();
          }
          else {
            logger.debug("geonear clients: " + JSON.stringify(clients) + " stats: " + JSON.stringify(stats));
            res.status(200).end(JSON.stringify(clients));
          }
        });
      });
    }
  });
});

module.exports = router;
