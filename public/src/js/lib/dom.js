/* jshint browser: true, strict: true */
/* global define */

define('dom', function(require, exports) {

    "use strict";


    // Composes two templates where a outer template renders a container
    // and a inner template renders an element for each item in a list 
    // which is supposed to be inside the conteiner.
    //
    // Example of usage is a <ul> list where the outer template renders the
    // <ul> element and the inner template renders each <li> in the list.

    exports.iterateAndComposeTemplates = function(objs, outerTemplate, innerTemplate) {
        var i       = 0,
            l       = objs.length,
            root    = outerTemplate.call(null);

        for (i = 0; i < l; i += 1) {
            root.appendChild(innerTemplate.call(null, objs[i]));
        }

        return root;
    };



    // Helper for removing all child elements of a DOM node.

    exports.removeChildElements = function(element) {
        if (element.hasChildNodes()) {
            while (element.childNodes.length >= 1) {
                element.removeChild(element.firstChild);
            }
        }
    };



    // Helper to add an element as the first child to a
    // given element.

    exports.addFirstChildElement = function(root, element) {
        var first   = root.firstChild;
        root.insertBefore(element, first);
    };



    // Helper to remove the last element child from a
    // given element

    exports.removeLastChildElement = function(root) {
        var last            = root.lastChild,
            parentElement   = last.parentNode;

        parentElement.removeChild(last);
    };

});
