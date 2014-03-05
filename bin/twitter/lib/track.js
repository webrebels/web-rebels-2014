/* jshint node: true, strict: true */

"use strict";

var EventEmitter    = require('events').EventEmitter,
    utils           = require('./utils.js');



// Inherit from Event Emitter

module.exports = new EventEmitter();



module.exports.get = function(api, query, messageLogLength) {

    api.get('statuses/user_timeline', {screen_name: 'trygve_lie', count: messageLogLength}, function(err, reply){ 
        if(err) {
            module.exports.emit('error', 'twitter - could not query twitter');
            return;
        }

        if (reply) {
            module.exports.emit('message', reply.filter(utils.filter).map(function(status){
                return utils.wash(status);
            }));
        }
    });

};
