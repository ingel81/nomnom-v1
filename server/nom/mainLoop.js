// NOMNOM LOOP //

//requires
var fs = require('fs');
var http = require('http');
var express = require('express');
var proc = require('child_process');

var config = require(__base + 'nom/config');
var motor = require(__base + 'nom/motor');
var core = require(__base + 'nom/core');
var slots = require(__base + 'nom/slots');
/*
 Common Functions
 */

//private module runtime vars

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
		core.tryTakePicture();
		//motor.autoDrive(43, null);		
		//slots.emptyNextSlot();
	}, config.mainTickInterval);
};

//init();

module.exports = {
	init : init
};
