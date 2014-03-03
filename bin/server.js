/* jshint node: true, strict: true */

"use strict";

var http    = require('http'),
    app     = require('./app.js'),
    config  = require('./config.js'),
    log     = require('./log.js'),
    ws      = require('./websocket.js'),
    server  = http.createServer(app),
    
    twitter     = require('./twitter');



// Max out the number of socket connections.
// Default concurrent sockets in node.js is 5. We need more!

http.globalAgent.maxSockets = Infinity;



// Load websocket

ws.init(server);



// Load Twitter

twitter.on('message', function(msg){
    ws.broadcast({
        type : 'twitter:message',
        data : msg
    });
});

twitter.on('error', function(msg){
    log.error(msg);
});

twitter.init({
    consumer_key: "na",
    consumer_secret: "na",
    access_token: "na",
    access_token_secret: "na"
}, 'na');



// Start http server

server.listen(config.get('httpServerPort'));
log.info('Web Rebels 2014 website running at http://localhost:' + config.get('httpServerPort') + '/');
log.info('Using templates in ' + config.get('viewRoot'));
log.info('Serving static files from ' + config.get('docRoot'));



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