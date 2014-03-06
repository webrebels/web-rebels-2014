/* jshint browser: true, strict: true */
/* global define */

define('init', function(require, exports) {

    "use strict";

    var twitter     = require('twitter'),
        ws          = require('ws.connection');
        

    ws.on('message', function(obj){
        var type = obj.type.split(':');
        if (type[0] === 'twitter') {
            twitter.render(obj.type, obj.data);
        }
    });

    ws.connect();

});