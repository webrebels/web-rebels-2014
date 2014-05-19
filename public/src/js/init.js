/* jshint browser: true, strict: true */
/* global define */

define('init', function(require, exports) {

    "use strict";

    var twitter     = require('twitter'),
        streaming   = require('streaming'),
        ws          = require('ws.connection');
        

    // Push messages

    ws.on('message', function(obj){
        var type = obj.type.split(':');
        if (type[0] === 'twitter') {
            twitter.render(obj.type, obj.data);
        }
    });

    ws.connect();



    // Video streaming

    streaming.render();



    // If browser window resized

    window.addEventListener('resize', function(){
        streaming.render();
    });
});