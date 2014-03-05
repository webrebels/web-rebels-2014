/* jshint node: true, strict: true */

"use strict";

var EventEmitter    = require('events').EventEmitter,
    users           = {};



// Inherit from Event Emitter

module.exports = new EventEmitter();



module.exports.lookup = function(api, screenNames) {

    api.get('users/lookup', {screen_name: screenNames}, function(err, reply){
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



// Get all users

module.exports.allUsers = function(){
    return users;
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



// Check if screen name is a registered user

module.exports.screenNameIsUser = function(screenName){
    if (users[screenName]) {
        return true;
    }
    return false;
};