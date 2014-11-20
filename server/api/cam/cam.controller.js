'use strict';

var _ = require('lodash');
var nom = require('../../nom')
var http = require('http');

// Get list of cams
exports.index = function(req, res) {
  res.json([]);
};

//  Get latest image
exports.latest = function(req, res){
	res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
	res.header('Expires', '-1');
	res.header('Pragma', 'no-cache');
	
	console.log(nom.config.livePictureName);
	
	res.sendfile(nom.config.livePictureName);
};