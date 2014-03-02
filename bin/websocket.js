/* jshint node: true, strict: true */

"use strict";

var EventEmitter        = require('events').EventEmitter,
    WebSocketServer     = require('websocket').server,
    uuid                = require('uuid'),
    log                 = require('./log.js'),
    config              = require('./config.js'),
    connections         = {},
    socket;



// Origin allowed check

function originIsAllowed(origin) {
    return true;
}



// Inherit from Event Emitter

module.exports = new EventEmitter();



// Init the module by pasing it a http server

module.exports.init = function(httpServer) {
    if (!httpServer) {
        log.error('websocket - init - "httpServer" not provided. Can not start WebSocket server');
        return;
    }

    socket = new WebSocketServer({httpServer: httpServer});

    socket.on('request', function(request) {

        if (!originIsAllowed(request.origin)) {
            request.reject();
            log.warn('websocket - ' + connection.remoteAddress + ' connecting from origin ' + request.origin + ' rejected');
            return;
        }

        var connection = request.accept(null, request.origin);

        connection.id = uuid.v4();
        connections[connection.id] = connection;
        
        log.info('websocket - ' + connection.remoteAddress + ' connecting from origin ' + request.origin + ' accepted');
        module.exports.emit('connection', connection.id);


        connection.on('close', function(reason, description) {
            log.info('websocket - ' + connection.remoteAddress + ' dissconnected');
            module.exports.emit('disconnection', connection.id);
            delete connections[connection.id];
        });


        connection.on('message', function(message) {
            if (message.type === 'utf8') {
                module.exports.emit('message', connection.id, message);
            }
        });

    });

};



// Send a message to single connection

module.exports.send = function(id, message) {
    var connection = connections[id];
    if (connection.connected) {
        connection.sendUTF(message);
    }
};



// Brodcast a message to all connections

module.exports.broadcast = function(message) {
    Object.keys(connections).forEach(function(key) {
        var connection = connections[key];
        if (connection.connected) {
            connection.sendUTF(message);
        }
    });
};



// Get number of open connections

module.exports.connectionsLength = function(){
    return Object.keys(connections).length;
};