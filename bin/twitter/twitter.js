/* jshint node: true, strict: true */

"use strict";

var EventEmitter    = require('events').EventEmitter,
    twit            = require('twit'),
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

module.exports.init = function(keys, query) {
    
    var stream;

    if (!keys) {
        module.exports.emit('error', 'twitter - init - "keys" not provided');
        return;
    }

    if (!query) {
        module.exports.emit('error', 'twitter - init - "query" not provided');
        return;
    }

    if (Twitter) {
        module.exports.emit('error', 'twitter - init - twitter already set up');
        return;
    }


    // Connect to Twitter

    Twitter = new twit(keys);


    // Get a chunc of tweets on the topic to follow

    Twitter.get('search/tweets', { q: 'javascript', count: 40 }, function(err, reply) {
        if(err) {
            module.exports.emit('error', 'twitter - init - could not query twitter');
            return;
        }

        messages = reply.statuses.filter(utils.filter).map(function(status){
            return utils.wash(status);
        });

    });


    // Listen on the stream API on the topic to follow

    stream = Twitter.stream('statuses/filter', {track: 'javascript'});


    stream.on('tweet', function(status) {
        var obj = {};

        if (utils.filter(status)) {
            obj = utils.wash(status);
            messages.push(obj);
            module.exports.emit('message', obj);
        }
    });

};



module.exports.latest = function(){
    return messages;
};