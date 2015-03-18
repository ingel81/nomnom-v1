'use strict';

var _ = require('lodash');
var config = require(__base + 'nom/config')
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
	
	console.log(config.livePictureName);
	
	res.sendfile(config.livePictureName);
};