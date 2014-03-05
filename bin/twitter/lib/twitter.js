/* jshint node: true, strict: true */

"use strict";

var EventEmitter    = require('events').EventEmitter,
    twit            = require('twit'),
    users           = require('./users.js'),
    stream          = require('./stream.js'),
    query           = require('./query.js'),
    utils           = require('./utils.js'),

    messagesFollow  = [],
    messagesTrack   = [];



// Inherit from Event Emitter

module.exports = new EventEmitter();



// Format for "keys"
//
// {
//    consumer_key: "na",
//    consumer_secret: "na",
//    access_token: "na",
//    access_token_secret: "na"
// }

module.exports.listen = function(keys, keywords, messageLogLength) {

    if (!keys.consumer_key) {
        module.exports.emit('error', 'twitter - "consumer_key" not provided - service is disabled');
        return;
    }

    if (!keys.consumer_secret) {
        module.exports.emit('error', 'twitter - "consumer_secret" not provided - service is disabled');
        return;
    }

    if (!keys.access_token) {
        module.exports.emit('error', 'twitter - "access_token" not provided - service is disabled');
        return;
    }

    if (!keys.access_token_secret) {
        module.exports.emit('error', 'twitter - "access_token_secret" not provided - service is disabled');
        return;
    }

    if (!keywords) {
        module.exports.emit('error', 'twitter - "keywords" not provided - service is disabled');
        return;
    }

    if (Twitter) {
        module.exports.emit('error', 'twitter - twitter already set up');
        return;
    }


    messageLogLength = messageLogLength || 10;


    // Connect to Twitter

    var Twitter = new twit(keys);



    stream.on('message', function(message){
        messagesFollow.unshift(message);
        if (messagesFollow.length > messageLogLength) {
            messagesFollow.pop();
        }
    });

    query.on('message', function(messagea){
        messagesFollow = messagea;
    });

    users.on('success', function(){
        query.get(Twitter, keywords, messageLogLength);
        stream.follow(Twitter, users.allUserIds());
    });
    users.lookup(Twitter, ['web_rebels', 'trygve_lie', 'hnycombinator', '0xabad1dea', 'addyosmani']);

};



module.exports.messages = function(){
    return messagesFollow;
};