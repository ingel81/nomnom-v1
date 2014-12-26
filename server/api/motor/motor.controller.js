'use strict';

var _ = require('lodash');
var nom = require('../../nom');

// Get list of motors
exports.drive = function(req, res) {
  console.log('received drive Requests ' + req.body);
  
  nom.drive(req.body.direction, req.body.steps);  
  
  res.json([]);  
};