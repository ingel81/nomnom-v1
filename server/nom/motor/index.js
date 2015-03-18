var config = require(__base + 'nom/config');
var core = require(__base + 'nom/core');

var manualDrive = function(direction, steps, rpm, cb){

	var command = 'sudo ' + config.stepperCtrlBinary;
	
	if(direction === 'cw'){
		command += ' -cw';
	}	
	else if(direction === 'ccw'){
		command += ' -ccw';
	}
	
	if(steps){
		command += ' -s ' + steps;
	}
	
	if(rpm){
		command += ' -rpm ' + rpm;
	}
	
	command += ' -m m';
	core.execCommand(command, cb);
}

var autoDrive = function(steps, cb){	
	var command = 'sudo ' + config.stepperCtrlBinary;
	
	if(steps){
		command += ' -auto ' + steps;
	}
	core.execCommand(command, cb);
}


module.exports = {
	manualDrive : manualDrive,
	autoDrive : autoDrive
}

