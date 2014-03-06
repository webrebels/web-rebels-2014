/* jshint browser: true, strict: true */
/* global define */

define('twitter.utils', function(require, exports) {

    "use strict";


    exports.parseText = function(text) {
        var arr = text.split(' '),
            i   = arr.length;

        while (i--) {
            if(arr[i].substr(0, 4) === 'http') {
                arr[i] = '<a href="' + arr[i] + '">'+arr[i]+'</a>';
            }

            if(arr[i].substr(0, 1) === '@') {
                arr[i] = '<a href="https://twitter.com/' + arr[i].substr(1) + '">'+arr[i]+'</a>';
            }
        }

        return arr.join(' ');
    };



    exports.stringToDate = function(dateString) {
        var arr     = dateString.split(/[: ]/g),
            months  = {
                jan : 0, 
                feb : 1, 
                mar : 2, 
                apr : 3, 
                may : 4, 
                jun : 5, 
                jul : 6,
                aug : 7, 
                sep : 8, 
                oct : 9, 
                nov : 10, 
                dec : 11  
            };

        return new Date(Date.UTC(arr[7], months[arr[1].toLowerCase()], arr[2], arr[3], arr[4], arr[5]));
    };



    exports.fixDateNumber = function(num) {
        return (num < 10) ? '0' + num.toString() : num.toString();
    };



    exports.parseDate = function(date) {
        var dateObj = this.stringToDate(date);
        return [
            this.fixDateNumber(dateObj.getDay()),
            '.',
            this.fixDateNumber(dateObj.getMonth()),
            '.',
            dateObj.getFullYear().toString(),
            ' - ',
            this.fixDateNumber(dateObj.getHours()),
            ':',
            this.fixDateNumber(dateObj.getMinutes()),
        ].join('');
    };

});
