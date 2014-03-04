/* jshint node: true, strict: true */

"use strict";

var EventEmitter    = require('events').EventEmitter,
    utils           = require('./utils.js');



// Inherit from Event Emitter

module.exports = new EventEmitter();



module.exports.follow = function(api, userIds) {

    var follow = api.stream('statuses/filter', {follow: userIds});

    follow.on('connect', function(req) {
        module.exports.emit('info', 'twitter - follower connected to the twitter stream api');
    });

    follow.on('warning', function(req) {
        module.exports.emit('info', 'twitter - follower got warning from the twitter stream api');
    });

    follow.on('reconnect', function(req, res, connectInterval) {
        module.exports.emit('info', 'twitter - follower was reconnected to the twitter stream api');
    });

    follow.on('tweet', function(message) {
        if (utils.filter(message)) {
            module.exports.emit('message', utils.wash(message));
        }
    });

    follow.on('disconnect', function(message) {
        module.exports.emit('error', 'twitter - follower was disconnected from the twitter stream api');
    });

};
