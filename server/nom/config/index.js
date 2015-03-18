//nomnom specific config

var paths = {
	slotConfig: __base + 'config/slotConfig.js',
	slotState: __base + 'state/slotState.js'
};

var _readSlotConfigFromFile = function() {
	var core = require(__base + 'nom/core');
	return core.readJSON(paths.slotConfig);
}

var _writeSlotConfigToFile = function(data) {
	var core = require(__base + 'nom/core');
	return core.writeJSON(paths.slotConfig, data);
}

var _readSlotState = function(){
	var core = require(__base + 'nom/core');
	return core.readJSON(paths.slotState);
};

var _writeSlotState = function(data){
	var core = require(__base + 'nom/core');
	return core.writeJSON(paths.slotState, data);
};

module.exports = {
	logFile: __base + 'log/nomnom.log',
	livePictureName: __base + 'latest.jpg',
	livePictureIntervalMS: 2000,
	stepperCtrlBinary: '/home/pi/pwmtest/stepperCtrl/stepperCtrl',
	httpPort: 80,
	mainTickInterval: 500,
	webDir: 'dist',
	slotConfig: _readSlotConfigFromFile,
	getSlotState: _readSlotState,
	writeSlotState: _writeSlotState
};