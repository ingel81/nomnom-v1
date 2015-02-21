//nomnom specific config

module.exports = {
	logFile : __dirname + '/nomnom.log',
	livePictureName : __dirname + '/latest.jpg',
	livePictureIntervalMS : 2000,
	stepperCtrlBinary: '/home/pi/pwmtest/stepperCtrl/stepperCtrl',
	httpPort : 80,
	mainTickInterval : 500,
	webDir : 'dist'	
};
