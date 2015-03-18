//requires
var fs = require('fs');
var http = require('http');
var express = require('express');
var proc = require('child_process');

var config = require(__base + 'nom/config');

/*
 Common Functions
 */

//Log
var _log = function(message){
	var now = new Date();	
	var logMessage = now.toISOString() + ': ' + (message || '') + '\n';
	fs.appendFile(config.logFile, logMessage, function (err, data) {
	  if (err){
		return console.log(err);
	  }	  
	});
};

var _execCommand = function(command, cb){
	_log('executing external process: ' + command);
	
	proc.exec(command,function (error, stdout, stderr) {
		if (error !== null) {
			_log('stdout: ' + stdout);
			_log('stderr: ' + stderr);		
			_log('exec error: ' + error);
		}		
		
		if(cb){			
			//cb(stdout);
			cb();
		}
		
	} ).unref();
};

var lastPictureTS = 0;
var resetCount = 0;

//reset the cam
var _resetUSB = function(){
	_getCmdOutput('lsusb | grep "QuickCam E 3500" | cut -f1 -d":" | cut -f4 -d" "', function(usbID){	
		if(usbID){
			var command = 'sudo usbreset /dev/bus/usb/001/' + usbID;	
			_execCommand(command);				
		}
	});
}

var _takePicture = function(){
	var command = 'sudo fswebcam -r 640x480 --info NomNomv1 ' + config.livePictureName;	
	_execCommand(command);

	resetCount++;
	if(resetCount > 5)
	{
		_resetUSB();
		resetCount = 0;		
	}	
}
var _tryTakePicture = function(){
		var nowTS = Date.now();		
		//console.log("tick");		
		if(lastPictureTS + config.livePictureIntervalMS <= nowTS){
			_log("try to take picture now");
			_takePicture();
			lastPictureTS = nowTS;
		}
};

var _getCmdOutput = function(command, cb){
	proc.exec(command,function (error, stdout, stderr) {		
		
		if(cb){
			cb(stdout);
		}		
	});	
};


var _readJsonFromFileSync = function(path){
	var str = fs.readFileSync(path, 'utf8');
	return JSON.parse(str);
};

var _writeJsonToFileSync = function(path, data){
	var result = fs.writeFileSync(path, JSON.stringify(data, null, 2));
};

console.log("before core exported");

module.exports = {
	getCmdOutput : _getCmdOutput,
	execCommand : _execCommand,
	log : _log,
	tryTakePicture : _tryTakePicture,
	writeJSON : _writeJsonToFileSync,
	readJSON : _readJsonFromFileSync
};
