/* jshint browser: true, strict: true */

define('modules/init', function(require, exports) {

    "use strict";

    var ws = require('modules/ws.connection');

    ws.on('error', function(obj){
        console.log('error', obj);
    });

    ws.on('open', function(){
        console.log('open');
    });

    ws.on('message', function(obj){
        console.log('message', obj);
    });

    ws.on('close', function(){
        console.log('close');
    });

    ws.connect();

});