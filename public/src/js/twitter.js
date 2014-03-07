/* jshint browser: true, strict: true */
/* global define */

define('twitter', function(require, exports) {

    "use strict";
    
    var tag             = require('tag').tag,
        dom             = require('dom'),
        utils           = require('twitter.utils'),
        followElement   = document.getElementById('twitter-follow'),
        listElement;
    

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

        if (!followElement) {
            return false;
        }

        if (type === 'twitter:follow:init') {
            listElement = dom.iterateAndComposeTemplates(data, renderContainer, renderMessage);
            dom.removeChildElements(followElement);
            followElement.appendChild(listElement);
        }

        if (type === 'twitter:follow:message') {
            if (listElement) {
                dom.addFirstChildElement(listElement, renderMessage(data));
                dom.removeLastChildElement(listElement);
            }
        }

    };

});