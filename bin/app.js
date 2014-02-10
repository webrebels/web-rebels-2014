/* jshint node: true, strict: true */

"use strict";

var http                = require('http'),
    config              = require('./config.js'),
    log                 = require('./log.js'),
    express             = require('express'),
    app                 = express();



app.disable('x-powered-by');

app.configure('all',function () {
    app.use(express.compress());
    app.use(express.static(config.get('docRoot')));
});



// Set templating engine

app.set('views', config.get('viewRoot'));
app.set('view engine', 'ejs');



// Set http routes
app.get('/', function(req, res){
    res.render('index_old', { pageTitle: 'Web Rebels ☠ Oslo ☠ 2014' });
});
app.get('/index2', function(req, res){
    res.render('index', { pageTitle: 'Web Rebels ☠ Oslo ☠ 2014' });
});
app.get('/sponsors', function(req,res){
    res.render('sponsors', {pageTitle: 'Our sponsors without whom none of this would be possible ☠ Web Rebels ☠ Oslo 2014'});
});
app.get('/sponsoroptions', function(req,res){
    res.render('sponsoroptions', {pageTitle: 'Sponsoring options for the Web Rebels ☠ Oslo 2014'});
});
app.get('/about', function(req,res){
    res.render('about', {pageTitle: '☠ About the Web Rebels ☠'});
});
app.get('/tickets', function(req,res){
    res.render('tickets', {pageTitle: 'Tickets for the Web Rebels ☠ Oslo 2014'});
});
app.get('/ticketConfirmation', function(req,res){
    res.render('ticketConfirmation', {pageTitle: 'Thank you for registering with the Web Rebels ☠ Oslo 2014'});
});
app.get('/location', function(req,res){
    res.render('location', {pageTitle: 'Location of the Web Rebels ☠ Oslo 2014'});
});
app.get('/oslo', function(req,res){
    res.render('oslo', {pageTitle: 'Oslo survival guide for Web Rebels ☠ Oslo 2014'});
});
app.get('/openmic', function(req,res){
    res.render('openmic', {pageTitle: 'Open Mic Night - Web Rebels ☠ Oslo 2014'});
});
app.get('/schedule', function(req,res){
    res.render('schedule', {pageTitle: 'Schedule for Web Rebels ☠ Oslo 2014'});
});
app.get('/speakers', function(req,res){
    res.render('speakers', {pageTitle: 'Speakers - Web Rebels ☠ Oslo 2014'});
});
app.get('/roadbook', function(req,res){
    res.render('roadbook', {pageTitle: 'Speakers Roadbook - Web Rebels ☠ Oslo 2014'});
});



// Set up http server

var httpServer = http.createServer(app);



// Export application

module.exports = httpServer;
