/* jshint node: true, strict: true */

"use strict";

var EventEmitter    = require('events').EventEmitter,
    twit            = require('twit'),
    users          = require('./users.js'),
    stream          = require('./stream.js'),
    query           = require('./query.js'),
    utils           = require('./utils.js'),

    messages        = [];



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
        console.log(message);
    });






    users.on('success', function(){
        stream.follow(Twitter, users.allUserIds());
    });
    users.lookup(Twitter, 'web_rebels', ['trygve_lie', 'bodil', 'jaffathecake']);



/*

    // Build a backlog of messages

    query.get(Twitter, keywords, messageLogLength, function queryError(message){
        module.exports.emit('error', message);

    }, function querySuccess(msgArr){
        messages = msgArr;

    });
*/

    // Listen for new messages
/*
    stream.listen(Twitter, keywords, function streamError(message){
        module.exports.emit('error', message);

    }, function streamInfo(message){
        module.exports.emit('info', message);

    }, function streamMessage(message){
        module.exports.emit('message', message);
        
        messages.unshift(message);
        if (messages.length > messageLogLength) {
            messages.pop();
        }

    });
*/


};



module.exports.messages = function(){
    return messages;
};