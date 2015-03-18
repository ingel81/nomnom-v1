'use strict';

var slots = require(__base + 'nom/slots')
var _ = require('lodash');

// Get list of slots
exports.index = function(req, res) {
	console.log(slots)
	res.json(slots.slots());
};

// refill all slots
exports.refillall = function(req, res) {
	slots.refill();
	res.json();
};

// empty next slot
exports.emptynextslot = function(req, res) {
	slots.emptyNextSlot(function() {
		res.json({
			"success": true
		});
	}, function(error) {
		res.json({
			"success": false,
			"error": error
		});
	});

};