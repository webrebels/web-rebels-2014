/* jshint browser: true, strict: true */
/* global define */

define('twitter', function(require, exports) {

    "use strict";
    
    var tag             = require('tag').tag,
        dom             = require('dom'),
        utils           = require('twitter.utils'),
        followElement   = document.getElementById('twitter-follow');
    

    function renderContainer() {
        return tag.ul({cl: 'group'});
    }



    function renderMessage(obj) {
        return tag.li(
            {cls:'msg'}, 
            tag.span({cl: 'time'}, utils.parseDate(obj.time)),
            tag.span({cl: 'text', ih : utils.parseText(obj.text)})
        );
    }



    exports.render = function(type, data){
        var list;

        if (!followElement) {
            return false;
        }

        if (type === 'twitter:follow:init') {
            list = dom.iterateAndComposeTemplates(data, renderContainer, renderMessage);
            followElement.appendChild(list);
        }

        if (type === 'twitter:follow:message') {

        }

    };

});