/* jshint node: true, strict: true */

"use strict";

var EventEmitter    = require('events').EventEmitter,
    inherits        = require('util').inherits,
    utils           = require('./utils.js');



// Object - Inherits from EventEmitter

var Follow = function(connection, count) {
    this.connection = connection;
    this.count = count || 100;
    this.messages = [];
};
inherits(Follow, EventEmitter);



// Populate a list of older tweets from each user

Follow.prototype.populate = function(userIds) {
    var self = this;

    self.connection.get('statuses/user_timeline', {user_id: userIds, count: self.count, exclude_replies: true, include_rts: false}, function(err, reply){ 
        if(err) {
            self.emit('error', 'twitter - follower could not query twitter');
            return;
        }

        if (reply) {
            self.messages = self.messages.concat(reply.filter(utils.filter).map(function(status){
                return utils.wash(status);
            }));
            self.emit('info', 'twitter - follower populated messages into backlog');
        }
    });
};



// Listen for new tweets in the users stream

Follow.prototype.listen = function(userIds) {
    var self    = this,
        stream  = this.connection.stream('statuses/filter', {follow: userIds});

    stream.on('connect', function(req) {
        self.emit('info', 'twitter - follower connected to the twitter stream api');
    });

    stream.on('warning', function(req) {
        self.emit('info', 'twitter - follower got warning from the twitter stream api');
    });

    stream.on('reconnect', function(req, res, connectInterval) {
        self.emit('info', 'twitter - follower was reconnected to the twitter stream api');
    });

    stream.on('tweet', function(message) {
        if (utils.filter(message)) {
            self.messages.unshift(utils.wash(message));
            if (self.messages.length > self.count) {
                self.messages.pop();
            }
            self.emit('message', self.messages[0]);
        }
    });

    stream.on('disconnect', function(message) {
        self.emit('error', 'twitter - follower was disconnected from the twitter stream api');
    });

};



// Return a list of messages

Follow.prototype.getMessages = function() {
    return this.messages;
};



module.exports = Follow;
