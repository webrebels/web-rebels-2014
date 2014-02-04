/* jshint node: true, strict: true */

"use strict";

var memory  = require('./memory.js'),
    server  = require('./app.js'),
    config  = require('./config.js'),
    log     = require('./log.js');



// Start application

server.listen(config.get('httpServerPort'));
log.info('Web Rebels 2014 website running at http://localhost:' + config.get('httpServerPort') + '/');
log.info('Serving documents from ' + config.get('docRoot'));



// Catch uncaught exceptions, log it and take down server in a nice way.
// Upstart or forever should handle kicking the process back into life!

process.on('uncaughtException', function(err) {
    log.error('shutdown - server taken down by force due to a uncaughtException');
    log.error(err.message);
    log.error(err.stack);
    process.exit(1);
});



// Listen for SIGINT (Ctrl+C) and do a gracefull takedown of the server

process.on('SIGINT', function() {
    log.info('shutdown - taking down server gracefully');
    process.exit(0);
});