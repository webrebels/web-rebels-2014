/* jshint browser: true, strict: true */
/* global define */

define('dom', function(require, exports) {

    "use strict";

    // Turn the values in a form into a object.
    // Washes out sertain values in a form we do not want there

    exports.serializeFormValues = function(formElements) {
        var i   = formElements.length,
            obj = {};


        while (i--) {
            if (formElements[i].type !== 'submit') {
                obj[formElements[i].name] = formElements[i].value;
            }
        }

        return obj;
    };



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



    // Helper for appending multiple elements to a element

    exports.appendMultipleChildElements = function(root, elements) {
        var i = 0,
            l = elements.length;

        for (i = 0; i < l; i += 1) {
            root.appendChild(elements[i]);
        }

        return root;
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



    // Helper to add an element as a sibling above an element

    exports.addSiblingAboveElement = function(root, element) {
        root.parentNode.insertBefore(element, root);
    };



    // Helper to add an element as a sibling below an element

    exports.addSiblingBelowElement = function(root, element) {
        root.parentNode.insertBefore(element, root.nextSibling);
    };



    // Helper to replace an element (and all its children) with a new element.

    exports.replaceElement = function(existingElement, newElement) {
        existingElement.parentNode.replaceChild(newElement, existingElement);
        return newElement;
    };



    // Helper to remove a given element

    exports.removeElement = function(element) {
        element.parentNode.removeChild(element);
    };



    // Helper to append a CSS class to a DOM element.
    // Will preserve existing classes.

    exports.appendCSSClass = function(element, className) {
        var classNames = element.getAttribute('class') ? element.getAttribute('class').split(' ') : [];
        classNames.push(className);
        element.setAttribute('class', classNames.join(' '));
    };



    // Replaces a CSS class at a DOM element.

    exports.replaceCSSClass = function(element, existingClassName, newClassName) {
        var classNames      = element.getAttribute('class'),
            newClassNames   = classNames.replace(existingClassName, newClassName);
        element.setAttribute('class', newClassNames);
    };



    // Remove a CSS class name from a DOM element.

    exports.removeCSSClass = function(element, className) {
        var classNames = element.getAttribute('class') ? element.getAttribute('class').split(' ') : [];
        classNames = classNames.splice(classNames.indexOf(className, 1));
        element.setAttribute('class', classNames.join(' '));
    };

});