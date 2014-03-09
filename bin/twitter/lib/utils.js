/* jshint node: true, strict: true */

"use strict";

var users   = require('./users.js');



// If the user.screen_name of the tweer are _not_ among the 
// users in the user object it is a retweet we do not want
// in our stream.

module.exports.isReTweet = function(obj) {
    return !users.screenNameIsUser(obj.user.screen_name);
};



module.exports.isReply = function(obj) {
    return !!obj.in_reply_to_status_id;
};



module.exports.isClean = function(obj) {
    return true;
};



module.exports.filter = function(obj) {

    if (module.exports.isReTweet(obj)) {
        return false;
    }

    if(module.exports.isReply(obj)) {
        return false;
    }

    if (!module.exports.isClean(obj)) {
        return false;
    }

    return true;
};



module.exports.wash = function(obj) {
    return { 
        id      : obj.id_str,
        time    : obj.created_at,
        text    : obj.text,
        name    : obj.user.name,
        user    : obj.user.screen_name,
        image   : obj.user.profile_image_url
     };
};