/* jshint node: true, strict: true */

"use strict";

var EventEmitter    = require('events').EventEmitter,
    twit            = require('twit'),
    utils           = require('./utils.js');


var tweets = [];



// Inherit from Event Emitter

module.exports = new EventEmitter();



// Connect to Twitter

var T = new twit({
    consumer_key: "na",
    consumer_secret: "na",
    access_token: "na",
    access_token_secret: "na"
});



// Get a chunc of tweets on the topic to follow

T.get('search/tweets', { q: 'javascript', count: 40 }, function(err, reply) {
    if(err) {
        console.log('error');
        return;
    }

    tweets = reply.statuses.filter(utils.filter).map(function(status){
        return utils.wash(status);
    });

});



// Listen on the stream API on the topic to follow

var stream = T.stream('statuses/filter', {track: 'javascript'});

stream.on('tweet', function(status) {
    var obj = {};

    if (utils.filter(status)) {
        obj = utils.wash(status);
        tweets.push(obj);
        module.exports.emit('message', obj);
        console.log(obj);
    }
});



module.exports.latest = function(){
    return tweets;
};