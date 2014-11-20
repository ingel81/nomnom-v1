'use strict';

var _ = require('lodash');
var fs = require('fs');
var nom = require('../../nom')

// Get logs
exports.index = function(req, res) {
	fs.readFile(nom.config.logFile, 'utf8', function (err,data) {
		if (err) {
			console.log(err);
			res.json({"logContent": "error"});
			return;
		}
	
		res.json({"logContent": data});
	});
};