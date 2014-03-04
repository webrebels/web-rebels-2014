/* jshint node: true, strict: true */

"use strict";

var EventEmitter    = require('events').EventEmitter,
    master          = '',
    users           = {};



// Inherit from Event Emitter

module.exports = new EventEmitter();



module.exports.lookup = function(api, accountUser, additionalUsers) {

    var everyone = additionalUsers || [];
    everyone.push(accountUser);
	
    master = accountUser;


    api.get('users/lookup', {screen_name: everyone}, function(err, reply){
        if (err) {
            module.exports.emit('error', err);
            return;
        }

        if (reply) {
            reply.forEach(function(item){
                users[item.screen_name] = item.id;
            });
            module.exports.emit('success', users);
        }
    });

};



// Get the screen name of all users as an Array

module.exports.allUserScreenNames = function(){
    return Object.keys(users).map(function(key){
        return key;
    });
};



// Get the id of all users as an Array

module.exports.allUserIds = function(){
    return Object.keys(users).map(function(key){
        return users[key];
    });
};



// Get the id of the account user

module.exports.accountUserId = function(){
    return users[master];
};