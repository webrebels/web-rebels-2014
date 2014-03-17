/* jshint node: true, strict: true */

"use strict";

var EventEmitter    = require('events').EventEmitter,
    inherits        = require('util').inherits,
    utils           = require('./utils.js');



// Object - Inherit from Event Emitter

var Track = function(connection, count) {
    this.connection     = connection;
    this.count          = count || 100;
    this.messages       = [];
    this.blacklist      = [];
};
inherits(Track, EventEmitter);



// Populate a list of older tweets by searching for the keywords

Track.prototype.populate = function(keywords) {
    var self = this;

    self.connection.get('search/tweets', {q: keywords.join(' OR '), count: 10}, function(err, reply) {
        if(err) {
            self.emit('error', 'twitter - tracker could not query twitter');
            return;
        }

        if (reply) {
            self.messages = self.messages.concat(reply.statuses.filter(function(msg){
                return utils.filter(msg, self.blacklist);
            }).map(function(msg){
                return utils.wash(msg);
            }));
            self.emit('info', 'twitter - tracker populated messages into backlog');
        }
    });
};



// Listen for new tweets filtered on the keywords

Track.prototype.listen = function(keywords) {
    var self    = this,
        stream  = this.connection.stream('statuses/filter', { track: keywords});

    stream.on('connect', function(req) {
        self.emit('info', 'twitter - tracker connected to the twitter stream api');
    });

    stream.on('warning', function(req) {
        self.emit('info', 'twitter - tracker got warning from the twitter stream api');
    });

    stream.on('reconnect', function(req, res, connectInterval) {
        self.emit('info', 'twitter - tracker was reconnected to the twitter stream api');
    });

    stream.on('tweet', function(message) {
        if (utils.filter(message, self.blacklist)) {
            self.messages.unshift(utils.wash(message));
            if (self.messages.length > self.count) {
                self.messages.pop();
            }
            self.emit('message', self.messages[0]);
        }
    });

    stream.on('disconnect', function(message) {
        self.emit('error', 'twitter - tracker was disconnected from the twitter stream api');
    });

};



// Return a list of messages

Track.prototype.getMessages = function() {
    return this.messages;
};



// Set a list of blacklisted users

Track.prototype.setBlacklist = function(blacklist) {
    this.blacklist = blacklist;
};



module.exports = Track;
