/* jshint node: true, strict: true */

"use strict";

var memwatch    = require('memwatch'),
    log         = require('./log.js'),
    start       = new Date();



// Milliseconds from the server was started

function uptime() {
    return new Date() - start;
}



// Report postgc heap size

memwatch.on('stats', function(stats) {
    log.info('memory - server has been running for ' + uptime() + 'ms - post gc stats:');
    log.info(stats);
});



// Listen for leaks and warn about them

memwatch.on('leak', function(info) { 
    log.warn('memory - possible memory leak detected');
    log.warn(info);
});