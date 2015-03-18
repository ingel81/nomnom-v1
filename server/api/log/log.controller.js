'use strict';

var _ = require('lodash');
var fs = require('fs');
var config = require(__base + 'nom/config');

// Get logs
exports.index = function(req, res) {
	fs.readFile(config.logFile, 'utf8', function (err,data) {
		if (err) {
			console.log(err);
			res.json({"logContent": "error"});
			return;
		}
	
		res.json({"logContent": data});
	});
};