/* jshint node: true, strict: true */

"use strict";



// Filter out retweets messages

module.exports.isReTweet = function(obj) {
    return !!obj.retweeted_status;
};



// Filter out reply to messages

module.exports.isReply = function(obj) {
    return !!obj.in_reply_to_status_id;
};



// Filter out messages from blacklisted users

module.exports.isBlacklisted = function(obj, blacklist) {
    return (blacklist.indexOf(obj.user.screen_name.toLowerCase()) !== -1);
};



module.exports.filter = function(obj, blacklist) {

    if (module.exports.isReTweet(obj)) {
        return false;
    }

    if (module.exports.isReply(obj)) {
        return false;
    }

    if (module.exports.isBlacklisted(obj, blacklist)) {
        return false;
    }

    return true;
};



module.exports.wash = function(obj) {
    return { 
        timestamp       : obj.created_at,
        id_str          : obj.id_str,
        text            : obj.text,
        name            : obj.user.name,
        screenName      : obj.user.screen_name,
        profileImageUrl : obj.user.profile_image_url
     };
};