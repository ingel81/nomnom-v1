'use strict';

var _ = require('lodash');
var nom = require(__base + 'nom/core');

// Get list of motors
exports.drive = function(req, res) {
  console.log('received drive Requests ' + req.body);
  
  nom.drive(req.body.direction, req.body.steps, req.body.rpm, function(){
	console.log('drive finished');
	res.json([]);  
  }); 
  
};