/* jshint browser: true, strict: true */
/* global define */

define('tag', function(require, exports) {


    "use strict";

    /**
     * A list of frequently used tagNames
     * @type Array
     */
    var tags = [
        "div", "p", "span", "a", "img", "em", "b", "strong", "button",
        "form", "input", "textarea", "select", "option", "label", "ul", "ol", "li",
        "h1", "h2", "h3", "h4", "table", "thead", "tbody", "tfoot", "th", "tr", "td",
        "header", "footer", "br"
    ];

    /**
     * @function
     * @param text String
     * Preparing the text for createTextNode()
     * @return String Entities is converted to unicode
     */
    function fixEntities( text ){

        var span = document.createElement( "span" );
        span.innerHTML = text;
        return span.textContent;
    }

    /**
     * @constructor
     */
    function Tag(){
        for ( var i=0; i < tags.length; i++ ) {
            this[ tags[ i ] ] = new Builder( tags[ i ] );
        }
    }

    /**
     * @function
     * @public
     *
     * You can add new tags dynamically by using this method
     * Ex: tag.add("section",["header"]); then use: tag.section()
     */
    Tag.prototype.add = function(){
        for( var i = 0; i < arguments.length; i++ ){
            if( !this[ arguments[ i ] ] ){
                this[ arguments[ i ] ] = new Builder( arguments[ i ] );
            }
        }
    };

    /**
     * @function
     * @public
     */
    Tag.prototype.fragment = function(){
        var fragment = document.createDocumentFragment();
        if( arguments[ 0 ]){
            for( var a = 0; a < arguments.length; a++ ){
                if( typeof arguments[ a ] == "string" ){
                    fragment.appendChild( document.createTextNode( fixEntities( arguments[ a ] ) ) );
                }else{
                    fragment.appendChild( arguments[ a ] );
                }
            }
        }

        return fragment;
    };

    /**
     * @constructor
     * @param tag
     */
    function Builder( tag ){

        var tagName = tag;

        return function build(){

            // Investigating possible concurrency issues
            var args = Array.prototype.slice.call(arguments);

            var el = document.createElement( tagName );

            if( args[ 0 ] ){

                for( var a = 0; a < args.length; a++ ){

                    // Check if the argument is an object holding attributes
                    if(args[ a ] instanceof Object && !(args[a].nodeType == 1 /*instanceof HTMLElement*/)){

                        var att = args[ a ];

                        for ( var i in att ) {

                            if( att.hasOwnProperty( i ) ){

                                if ( i == "class" || i == "className" || i == "cl" || i == "cls" ) {
                                    typeof att[ i ].join == "function" ?
                                        el.className = att[ i ].join(" ") :
                                        el.className = att[ i ];

                                } else if ( i == "innerHTML" || i == "ih" ) {
                                    typeof att[ i ].join == "function" ?
                                        el.innerHTML = att[ i ].join(" ") :
                                        el.innerHTML = att[ i ];

                                } else if ( i.indexOf( "style." ) > -1 ) {
                                    var iS = i.split( "." );
                                    el[ iS[ 0 ] ][ iS[ 1 ] ] = att[ i ];

                                } else if ( i == "style" && typeof att[ i ] == "object") {
                                    for (var y in att[ i ])
                                        if(att[ i ].hasOwnProperty( y ) )
                                            el[ i ][ y ] = att[ i ][ y ];

                                } else {
                                    el.setAttribute( i, att[ i ] );

                                }

                            }

                        }

                    }


                    // If the argument is a string, it should be appended as text node
                    else if( typeof args[ a ] == "string" ){
                        el.appendChild( document.createTextNode( fixEntities( args[ a ] ) ) );

                    }

                    // Else if the argument is not an object we assume it is htmlElement
                    else if( args[ a ] && args[ a ].nodeType == 1 /*instanceof HTMLElement*/ ){
                        el.appendChild( args[ a ] );

                    }

                }

            }

            return el;

        };
    }

    exports.tag = new Tag();

});
