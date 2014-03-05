/* jshint node: true, strict: true */

"use strict";

var users   = require('./users.js'),
    self    = this;



module.exports.isRealTweet = function(obj) {
    return users.screenNameIsUser(obj.user.screen_name);
};



module.exports.isClean = function(obj) {
    return true;
};



module.exports.filter = function(obj) {

    if (!self.isRealTweet(obj)) {
        return false;
    };

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