/* jshint node: true, strict: true */

"use strict";

var utils = require('./utils.js');



module.exports.get = function(api, query, messageLogLength, onError, onSuccess) {

    var messages = [];
/*

    api.get('users/lookup', {screen_name: ['trygve_lie', 'web_rebels']}, function(err, reply){
        console.log(reply);
    });
*/

    api.get('statuses/user_timeline', {screen_name: 'trygve_lie', count: messageLogLength}, function(err, reply) {
        if(err) {
            onError.call(null, 'twitter - could not query twitter');
            return;
        }

        if (reply) {
            messages = reply.filter(utils.filter).map(function(status){
                return utils.wash(status);
            });
        }

        onSuccess.call(null, messages);
    });

};
