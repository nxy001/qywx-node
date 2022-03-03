var express = require('express');
var router = express.Router();

const contactController = require('../server/contactController');
const mediaController = require('../server/mediaController');
const messageController = require('../server/messageController');

const externalController = require('../server/externalController');
contactController(router);
mediaController(router);
messageController(router);
externalController(router);

module.exports = router;
