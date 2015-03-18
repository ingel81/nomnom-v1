'use strict';

var express = require('express');
var controller = require('./slot.controller');

var router = express.Router();

router.get('/', controller.index);
router.post('/refillall', controller.refillall);
router.post('/emptynextslot', controller.emptynextslot);

module.exports = router;