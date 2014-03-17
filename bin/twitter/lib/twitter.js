/* jshint node: true, strict: true */

"use strict";

var EventEmitter    = require('events').EventEmitter,
    inherits        = require('util').inherits,
    twit            = require('twit'),
    users           = require('./users.js'),
    Follow          = require('./follow.js'),
    Track           = require('./track.js');



// Object - Inherits from EventEmitter

// Format for "keys"
//
// {
//    consumer_key: "na",
//    consumer_secret: "na",
//    access_token: "na",
//    access_token_secret: "na"
// }

var Twitter = function(keys) {
    this.connection = null;
    this.following = null;
    this.tracking = null;
    this.keys = keys;
};
inherits(Twitter, EventEmitter);



Twitter.prototype.listen = function() {

    if (!this.keys.consumer_key) {
        this.emit('error', 'twitter - "consumer_key" not provided - service is disabled');
        return;
    }

    if (!this.keys.consumer_secret) {
        this.emit('error', 'twitter - "consumer_secret" not provided - service is disabled');
        return;
    }

    if (!this.keys.access_token) {
        this.emit('error', 'twitter - "access_token" not provided - service is disabled');
        return;
    }

    if (!this.keys.access_token_secret) {
        this.emit('error', 'twitter - "access_token_secret" not provided - service is disabled');
        return;
    }

    this.connection = new twit(this.keys);

};



// Follow users

Twitter.prototype.follow = function(screenNames, count) {

    var self = this;

    if (!this.connection) {
        return;
    }

    this.following = new Follow(this.connection, count);
    
    this.following.on('info', function(message){
        self.emit('info', message);
    });

    this.following.on('error', function(message){
        self.emit('error', message);
    });

    this.following.on('message', function(message){
        self.emit('followMessage', message);
    });


    // Resolve user

    users.on('success', function(){
        var uids = users.allUserIds();
        self.following.populate(uids[0]);
        self.following.listen(uids);
    });
    users.lookup(this.connection, screenNames);
};



Twitter.prototype.followMessages = function() {
    if (!this.connection) {
        return [];
    }
    return this.following.getMessages();
};



// Track keywords

Twitter.prototype.track = function(keywords, count) {
    
    var self = this;

    if (!this.connection) {
        return;
    }

    this.tracking = new Track(this.connection, count);

    this.tracking.on('info', function(message){
        self.emit('info', message);
    });

    this.tracking.on('error', function(message){
        self.emit('error', message);
    });

    this.tracking.on('message', function(message){
        self.emit('trackMessage', message);
    });
    
    this.tracking.populate(keywords);
    this.tracking.listen(keywords);
};



Twitter.prototype.trackMessages = function() {
    if (!this.connection) {
        return [];
    }
    return this.tracking.getMessages();
};



// Set a list of blacklisted users

Twitter.prototype.setBlacklist = function(blacklist) {
    if (this.following) {
        this.following.setBlacklist(blacklist);
    }
    
    if (this.tracking) {
        this.tracking.setBlacklist(blacklist);
    }
};



module.exports = Twitter;
