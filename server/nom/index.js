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

var execCommand = function(command){
	log('executing external process: ' + command);
	proc.exec(command,function (error, stdout, stderr) {
		if (error !== null) {
			log('stdout: ' + stdout);
			log('stderr: ' + stderr);		
			log('exec error: ' + error);
		}
	} ).unref();
}

var takePicture = function(){
	var command = 'fswebcam ' + config.webDir + '/' + config.livePictureName;	
	execCommand(command);	
}

//private module runtime vars
var lastPictureTS = 0;
var isRunning = false;

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
	config : config
}

