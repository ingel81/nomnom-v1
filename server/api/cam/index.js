'use strict';

var express = require('express');
var controller = require('./cam.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/latest', controller.latest);

module.exports = router;