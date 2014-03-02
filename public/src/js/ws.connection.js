/* jshint browser: true, strict: true */

define('ws.connection', function(require, exports) {

    "use strict";

    var utils = require('ws.utils'),

        socket,
        socketForceClosed   = false,
        events              = {
            open        : null,
            message     : null,
            close       : null,
            error       : null
        },

        retry               = 1000,
        delay               = 150,
        limit               = 60000, // 1 minute

        open;



    function onClose() {
        if (!socketForceClosed) {

            if(retry > limit) {
                socketForceClosed = true;
                events.error.call(null, {code : 1, error : null});
            } else {
                setTimeout(open, retry);
                retry = retry + delay;
            }
        }

        if (events.close) {
            events.close.call(null);
        }
    }


    function onError(err) {
        if (events.error) {
            events.error.call(null, {code : 0, error : err});
        }
    }


    function onOpen() {
        socketForceClosed = false;
        if (events.open) {
            events.open.call(null);
        }
    }


    function onMessage(msg) {
        var obj = {};

        try {
            obj = JSON.parse(msg.data);
            if (events.message) {
                events.message.call(null, obj);
            }
        } catch(err) {
            return;
        }
    }


    open = function() {
        if (utils.supported()) {
            socket = new WebSocket(utils.url());
            socket.addEventListener('open', onOpen);
            socket.addEventListener('message', onMessage);
            socket.addEventListener('close', onClose);
            socket.addEventListener('error', onError);
        }
    };



    // Public methods

    exports.connect = function(server) {
        open();
        return this;
    };


    exports.close = function() {
        socketForceClosed = true;
        if (socket) {
            socket.close();
        }
        return this;
    };


    exports.send = function(obj) {
        if (socket && obj) {
            socket.send(JSON.stringify(obj));
        }
        return this;
    };


    exports.on = function(event, fn){
        if (event && fn) {
            events[event] = fn;
        }
        return this;
    };

});
