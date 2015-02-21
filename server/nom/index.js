// NOMNOM LOOP //

//requires
var fs = require('fs');
var http = require('http');
var express = require('express');
var proc = require('child_process');
var config = require('./nomconf.js')

/*
 Common Functions
 */

//Log
var log = function(message){
	var now = new Date();	
	var logMessage = now.toISOString() + ': ' + (message || '') + '\n';
	fs.appendFile(config.logFile, logMessage, function (err, data) {
	  if (err){
		return console.log(err);
	  }	  
	});
};

var execCommand = function(command, cb){
	log('executing external process: ' + command);
	
	proc.exec(command,function (error, stdout, stderr) {
		if (error !== null) {
			log('stdout: ' + stdout);
			log('stderr: ' + stderr);		
			log('exec error: ' + error);
		}		
		
		if(cb){			
			cb(stdout);
		}
		
	} ).unref();
}

var getCmdOutput = function(command, cb){
	proc.exec(command,function (error, stdout, stderr) {		
		
		if(cb){
			cb(stdout);
		}		
	});	
};

//private module runtime vars
var lastPictureTS = 0;
var resetCount = 0;
var isRunning = false;

//reset the cam
var resetUSB = function(){
	getCmdOutput('lsusb | grep "QuickCam E 3500" | cut -f1 -d":" | cut -f4 -d" "', function(usbID){	
		if(usbID){
			var command = 'sudo usbreset /dev/bus/usb/001/' + usbID;	
			execCommand(command);				
		}
	});
}

var takePicture = function(){
	var command = 'sudo fswebcam -r 640x480 --info NomNomv1 ' + config.livePictureName;	
	execCommand(command);

	resetCount++;
	if(resetCount > 5)
	{
		resetUSB();
		resetCount = 0;		
	}	
}

var drive = function(direction, steps, rpm, cb){

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
	execCommand(command, cb);
}

var init = function(){
	
	if(isRunning === true){
		console.log("nomnom mainloop already running!");
		return;
	}
	
	isRunning = true;
	console.log("nomnom mainloop started");
	
	//main tick
	var mainTickInterval = setInterval(function(){		
		var nowTS = Date.now();		
		//log("tick");		
		if(lastPictureTS + config.livePictureIntervalMS <= nowTS){
			log("try to take picture now");
			takePicture();
			lastPictureTS = nowTS;
		}	
	}, config.mainTickInterval);
};

module.exports = {
	init : init,
	config : config,
	drive: drive
}

