/* jshint node: true, strict: true */

"use strict";

var EventEmitter    = require('events').EventEmitter,
    twit            = require('twit'),
    stream          = require('./stream.js'),
    query           = require('./query.js'),
    utils           = require('./utils.js');



var messages = [],
    Twitter;



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

module.exports.init = function(keys, keywords) {

    if (!keys) {
        module.exports.emit('error', 'twitter - init - "keys" not provided');
        return;
    }

    if (!keywords) {
        module.exports.emit('error', 'twitter - init - "keywords" not provided');
        return;
    }

    if (Twitter) {
        module.exports.emit('error', 'twitter - init - twitter already set up');
        return;
    }


    // Connect to Twitter

    Twitter = new twit(keys);


    // Build a backlog of messages

    query.get(Twitter, keywords, function(message){
        module.exports.emit('error', message);

    }, function(msgArr){
        messages = msgArr;

    });


    // Listen for new messages

    stream.listen(Twitter, keywords, function(message){
        module.exports.emit('error', message);

    }, function(message){
        module.exports.emit('info', message);

    }, function(message){
        messages.push(message);
        module.exports.emit('message', message);

    });

};



module.exports.latest = function(){
    return messages;
};