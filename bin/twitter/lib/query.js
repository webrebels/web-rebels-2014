/* jshint node: true, strict: true */

"use strict";

var utils = require('./utils.js');



module.exports.get = function(api, query, onError, onSuccess) {

	var messages = [];

    api.get('search/tweets', { q: query, count: 40 }, function(err, reply) {
        if(err) {
            onError.call(null, 'twitter - could not query twitter');
            return;
        }

        messages = reply.statuses.filter(utils.filter).map(function(status){
            return utils.wash(status);
        });

        onSuccess.call(null, messages);
    });

};
