/* jshint node: true, strict: true */

"use strict";

var wss     = require('ws').Server,
    log     = require('./log.js'),
    config  = require('./config.js'),
    socket;



module.exports.init = function(httpServer) {
    socket = new wss({
        server:  httpServer,
        path : config.get('wsPath'),
        disableHixie : true
    });
};