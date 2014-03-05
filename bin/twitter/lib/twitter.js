/* jshint node: true, strict: true */

"use strict";

var EventEmitter    = require('events').EventEmitter,
    twit            = require('twit'),
    users           = require('./users.js'),
    Follow          = require('./follow.js');



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



    // Connect to Twitter

    var Twitter = new twit(keys);


    // Follow users

    var following = new Follow(Twitter, 10);
    
    following.on('info', function(message){
        module.exports.emit('info', message);
    });

    following.on('error', function(message){
        module.exports.emit('error', message);
    });

    following.on('message', function(message){
        module.exports.emit('message', message);
    });


    // Resolve user

    users.on('success', function(){
        var uids = users.allUserIds();
        following.populate(uids[0]);
        following.listen(uids);
    });
    users.lookup(Twitter, ['web_rebels', 'trygve_lie', 'rem', 'codepo8', '0xabad1dea', 'addyosmani', 'jaffathecake']);

};



module.exports.messages = function(){
    return [];
};