/* jshint node: true, strict: true */

"use strict";

var users   = require('./users.js'),
    self    = this;



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

    if (self.isReTweet(obj)) {
        return false;
    };

    if(self.isReply(obj)) {
        return false;
    }

    if (!self.isClean(obj)) {
        return false;
    }

    return true;
};



module.exports.wash = function(obj) {
    return { 
        timestamp: obj.created_at,
        id: obj.id_str,
        lang: obj.lang,
        text: obj.text,
        userName: obj.user.name,
        userScreenName: obj.user.screen_name,
        userImageUrl: obj.user.profile_image_url
     };
};