/* jshint node: true, strict: true */

"use strict";


var gulp        = require('gulp'),
    concat      = require('gulp-concat'),
    uglify      = require('gulp-uglify'),
    minifyCSS   = require('gulp-minify-css'),
    config      = require('./bin/config.js');



function prependDocRoot(path) {
    return config.get('docRoot') + path;
}



// Minify JS

gulp.task('js', function() {
    return gulp.src(config.get('jsFiles').map(prependDocRoot))
        .pipe(uglify({outSourceMap: false}))
        .pipe(concat(config.get('jsMinFile')[0]))
        .pipe(gulp.dest('public/build'));
});



// Minify CSS

gulp.task('css', function() {
    return gulp.src(config.get('cssFiles').map(prependDocRoot))
        .pipe(minifyCSS({removeEmpty : true}))
        .pipe(concat(config.get('cssMinFile')[0]))
        .pipe(gulp.dest('public/build'));
});



// Copy gfx

gulp.task('gfx', function() {
    return gulp.src(config.get('gfxFiles').map(prependDocRoot))
        .pipe(gulp.dest('public/build/img'));
});



// Copy favicon

gulp.task('icon', function() {
    return gulp.src('public/src/favicon.ico')
        .pipe(gulp.dest('public/build'));
});


// Copy fonts

gulp.task('fonts', function() {
    return gulp.src(config.get('fontFiles').map(prependDocRoot))
        .pipe(gulp.dest('public/build/webfonts'));
});



// The default task

gulp.task('default', ['js', 'css', 'gfx', 'fonts', 'icon']);
