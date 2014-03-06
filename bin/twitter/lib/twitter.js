/* jshint node: true, strict: true */

"use strict";

var EventEmitter    = require('events').EventEmitter,
    inherits        = require('util').inherits,
    twit            = require('twit'),
    users           = require('./users.js'),
    Follow          = require('./follow.js');



// Object - Inherits from EventEmitter

// Format for "keys"
//
// {
//    consumer_key: "na",
//    consumer_secret: "na",
//    access_token: "na",
//    access_token_secret: "na"
// }

var Twitter = function() {
    this.Connection;
    this.following;
}
inherits(Twitter, EventEmitter);



Twitter.prototype.listen = function(keys, keywords, count) {

    var self = this;

    if (!keys.consumer_key) {
        this.emit('error', 'twitter - "consumer_key" not provided - service is disabled');
        return;
    }

    if (!keys.consumer_secret) {
        this.emit('error', 'twitter - "consumer_secret" not provided - service is disabled');
        return;
    }

    if (!keys.access_token) {
        this.emit('error', 'twitter - "access_token" not provided - service is disabled');
        return;
    }

    if (!keys.access_token_secret) {
        this.emit('error', 'twitter - "access_token_secret" not provided - service is disabled');
        return;
    }

    if (!keywords) {
        this.emit('error', 'twitter - "keywords" not provided - service is disabled');
        return;
    }


    // Connect to Twitter

    this.Connection = new twit(keys);


    // Follow users

    this.following = new Follow(this.Connection, count);
    
    this.following.on('info', function(message){
        self.emit('info', message);
    });

    this.following.on('error', function(message){
        self.emit('error', message);
    });

    this.following.on('message', function(message){
        self.emit('message', message);
    });


    // Resolve user

    users.on('success', function(){
        var uids = users.allUserIds();
        self.following.populate(uids[0]);
        self.following.listen(uids);
    });
    users.lookup(this.Connection, keywords);
};



Twitter.prototype.messages = function() {
    return this.following.getMessages();
};



module.exports = Twitter;
