var config = require(__base + 'nom/config');
var motor = require(__base + 'nom/motor');

var slots = [];
var slotConfig = [];

var state = "ready";

//find the first full (valid) slot
var _nextFilledSlot = function() {

	var targetSlot = null;

	//console.log(slots.length);

	for (var i = 0; i < slots.length; i++) {
		if (slots[i].status === 'full' && slots[i].active === true) {
			targetSlot = slots[i];
			break;
		}

		//console.log(slots[i].status);
	}

	return targetSlot;
};

var _getSlotConfigById = function(slotId) {

	var targetConfig = null;

	for (var i = 0; i < slotConfig.length; i++) {
		if (slotConfig[i].id === slotId) {
			targetConfig = slotConfig[i];
			break;
		}
	}
	return targetConfig;
};


//set all to refilled
var _refill = function() {

	for (var i = 0; i < slots.length; i++) {
		slots[i].status = 'full';

	}

	config.writeSlotState(slots);
};

var emptyNextSlot = function(successCb, errorCb) {

	if (state !== 'ready') {
		return;
	}

	state = 'busy';

	//get next full slot
	var nextSlot = _nextFilledSlot();

	if (nextSlot === null) {
		state = 'ready';

		if (errorCb) {
			errorCb("no slot ready!");
		}

		return false;
	}

	console.log("next free slot is " + nextSlot.id);

	//get config of slot
	var nextSlotConfig = _getSlotConfigById(nextSlot.id);
	if (nextSlotConfig === null) {
		state = 'ready';

		if (errorCb) {
			errorCb("no config for slot! wierd");
		}

		return false;
	}

	//empty out the slot
	motor.autoDrive(nextSlotConfig.offset, function() {

		console.log("emptied out : " + nextSlotConfig.id);
		nextSlot.status = "empty";
		config.writeSlotState(slots);
		state = 'ready';

		if (successCb) {
			successCb();
		}

	});
};

var init = function() {
	slots = config.getSlotState();
	//console.log(slots);

	slotConfig = config.slotConfig();
	//console.log(slotConfig);
}

var getSlots = function() {
	return slots;
};

module.exports = {
	slots: getSlots,
	init: init,
	emptyNextSlot: emptyNextSlot,
	refill: _refill
}

init();