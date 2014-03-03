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
        log.error('websocket - init - "httpServer" not provided. can not start WebSocket server');
        return;
    }

    if (socket) {
        log.error('websocket - init - socket already set up');
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
            var obj = {};
            
            if (message.type === 'utf8') {
                try {
                    obj = JSON.parse(message.utf8Data);
                } catch(err) {
                    log.error('websocket - inbound JSON object can not be parsed!');
                    log.error(err);
                    return;
                }
                module.exports.emit('message', connection.id, obj);
            }
        });

    });

};



// Send a object to single connection

module.exports.send = function(id, obj) {
    var connection = connections[id];
    if (connection.connected) {
        connection.sendUTF(JSON.stringify(obj));
    }
};



// Brodcast a object to all connections

module.exports.broadcast = function(obj) {
    Object.keys(connections).forEach(function(key) {
        var connection = connections[key];
        if (connection.connected) {
            connection.sendUTF(JSON.stringify(obj));
        }
    });
};



// Get number of open connections

module.exports.connectionsLength = function(){
    return Object.keys(connections).length;
};