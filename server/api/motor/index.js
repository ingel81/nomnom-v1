'use strict';

var express = require('express');
var controller = require('./motor.controller');

var router = express.Router();

router.post('/drive', controller.drive);

module.exports = router;