/* jshint browser: true, strict: true */

define('ws.utils', function(require, exports) {

    "use strict";


    // Check if browser has web socket support

    exports.supported = function() {
        return 'WebSocket' in window && window.WebSocket.CLOSING === 2;
    };



    // Build url to server

    exports.url = function() {
        return (window.location.protocol === 'https:' ? 'wss:' : 'ws:') + '//' + window.location.host;
    };

});