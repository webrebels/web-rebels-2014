/* jshint node: true, strict: true */

"use strict";

var utils = require('./utils.js');



module.exports.listen = function(api, keywords, onError, onInfo, onMessage) {
    
    var stream = api.stream('statuses/filter', {track: keywords});

    stream.on('connect', function(req) {
        onInfo.call(null, 'twitter - connected to the twitter stream api');
    });

    stream.on('warning', function(req) {
        onInfo.call(null, 'twitter - warning from the twitter stream api');
    });

    stream.on('reconnect', function(req, res, connectInterval) {
        onInfo.call(null, 'twitter - reconnected to the twitter stream api');
    });

    stream.on('tweet', function(message) {
        if (utils.filter(message)) {
            onMessage.call(null, utils.wash(message));
        }
    });

    stream.on('disconnect', function(message) {
        onError.call(null, 'twitter - disconnected from the twitter stream api');
    });

};
