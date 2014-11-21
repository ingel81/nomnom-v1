//config
var logFile = __dirname + '/nomnom.log'
var livePictureName = 'images/live.jpg';
var livePictureIntervalMS = 10000;
var httpPort = 80;
var mainTickInterval = 1000;
var webDir = 'dist';

//requires
var fs = require('fs');
var http = require('http');
var express = require('express');
var proc = require('child_process');

//configure webApp

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};

var app = express();
app.use(allowCrossDomain);
app.use('/', express.static(__dirname + '/' + webDir));

// app.get('/', function(req, res) {
  // res.sendFile(__dirname + '/' + webDir + "/index.html"); 
// });

/*
#######
# API #
#######
*/

app.get('/api/test', function(req, res) {	
  res.json({"affe": "bert"}); 
});

app.get('/api/getlog', function(req, res) {	
	fs.readFile(logFile, 'utf8', function (err,data) {
		if (err) {
			console.log(err);
			res.json({"logContent": "error"});
			return;
		}
	
		res.json({"logContent": data});
	});
});

app.get('/api/cam/capture', function(req, res) {
  res.json({"affe": "bert"}); 
});

app.get('/api/cam/lastImage', function(req, res) {
	res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
	res.header('Expires', '-1');
	res.header('Pragma', 'no-cache');
	res.sendFile(__dirname + '/' + webDir + '/' + livePictureName);
});

/*Catchall to index.hmtl*/
app.use(function(req, res) {	
    res.sendFile(__dirname + '/' + webDir + "/index.html"); 
});

//startup webApp
app.listen(httpPort);


/*
 Common Functions
 */

//Log
var log = function(message){
	var now = new Date();	
	var logMessage = now.toISOString() + ': ' + (message || '') + '\n';
	fs.appendFile(logFile, logMessage, function (err, data) {
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
	var command = 'fswebcam ' + webDir + '/' + livePictureName;	
	execCommand(command);	
}

//runtime vars
var lastPictureTS = 0;

//main tick
var mainTickInterval = setInterval(function(){
	var nowTS = Date.now();	
	
	//log("tick");
	
	if(lastPictureTS + livePictureIntervalMS <= nowTS){
		log("try to take picture now");
		takePicture();
		lastPictureTS = nowTS;
	}
	
}, mainTickInterval);