/* jshint browser: true, strict: true */
/* global define */

define('streaming', function(require, exports) {

    "use strict";
    
    var tag             = require('tag').tag,
        dom             = require('dom'),
        previous        = 'default';


    function buildDummy(){
        return tag.div({cl:'stream hidden', id:'streaming'});
    }


    function buildPlayer(width, height) {
        return tag.div(
            {cl:'stream', id:'streaming'}, 
            tag.iframe({id: 'iframe_player', 
                        width: width, 
                        height: height, 
                        frameborder: '0', 
                        scrolling: 'no', 
                        src:'https://publisher.qbrick.com/Embed.aspx?mcid=8360C870C943EA96&width='+width+'&height='+height+'&sp=0'
            })
        );
    }



    exports.render = function(){
        
        var streamingElement    = document.getElementById('streaming'),
            width               = document.documentElement.clientWidth;

        if (!streamingElement) {
            return false;
        }

        
        // Media query Min Width 1350

        if (width > 1350) {
            if(previous != 'a') {
                streamingElement = dom.replaceElement(streamingElement, buildPlayer('1280', '720'));
                previous = 'a';
            }
            return;
        } 

        // Media query Min Width 1000

        if (width > 800) {
            if (previous != 'b') {
                streamingElement = dom.replaceElement(streamingElement, buildPlayer('720', '480'));
                previous = 'b';
            }
            return;
        } 

        // Media query Min Width 500

        if (width > 500) {
            if (previous != 'c') {
                streamingElement = dom.replaceElement(streamingElement, buildPlayer('352', '240'));
                previous = 'c';
            }
            return;
        }

        streamingElement = dom.replaceElement(streamingElement, buildDummy());
        previous = 'default';

    };

});