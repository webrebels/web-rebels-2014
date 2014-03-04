/* jshint node: true, strict: true */

"use strict";

var self = this;



module.exports.isRealTweet = function(obj) {
    return (obj.text.substring(0,3).toLowerCase() !== 'rt ');
};



module.exports.isLegalLanguage = function(obj) {
    var legalLang = {
        'en' : true,
        'no' : true
    }
    return legalLang[obj.lang] || false;
};



module.exports.isClean = function(obj) {
    return true;
};



module.exports.filter = function(obj) {

    if (!self.isRealTweet(obj)) {
        return false;
    };
/*
    if (!self.isLegalLanguage(obj)) {
        return false;
    }
*/
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