/* jshint node: true, strict: true */

"use strict";

var config      = require('./config.js'),
    middleware  = require('./middleware.js'),
    log         = require('./log.js'),
    ws          = require('./websocket.js'),
    express     = require('express'),
    compress    = require('compression')(),
    serveStatic = require('serve-static'),
    twitter     = require('./twitter'),
    app         = express(),
    externals   = {
        js      : (config.get('env') === 'development') ? config.get('jsFiles') : config.get('jsMinFile'),
        css     : (config.get('env') === 'development') ? config.get('cssFiles') : config.get('cssMinFile')
    };



// Load Twitter


var T = new twitter({
    consumer_key: config.get('twitterConsumerKey'),
    consumer_secret: config.get('twitterConsumerSecret'),
    access_token: config.get('twitterAccessToken'),
    access_token_secret: config.get('twitterAccessTokenSecret')
});

T.on('followMessage', function(msg){
    log.debug('twitter - follow message', msg);
    ws.broadcast({
        type : 'twitter:follow:message',
        data : msg
    });
});

T.on('trackMessage', function(msg){
    log.debug('twitter - track message', msg);
    ws.broadcast({
        type : 'twitter:track:message',
        data : msg
    });
});

T.on('info', function(msg){
    log.info(msg);
});

T.on('error', function(msg){
    log.error(msg);
});


T.listen();

T.follow(config.get('twitterFollowUsers'), config.get('twitterFollowQueLenght'));
T.track(config.get('twitterTrackKeywords'), config.get('twitterTrackQueLenght'));



// Set up websocket listeners

ws.on('connection', function(id){
    ws.send(id, {
        type: 'twitter:follow:init',
        data: T.followMessages()
    });
});



// Configure app

app.disable('x-powered-by');
app.enable('trust proxy');



// Set middleware

app.use(middleware.ensureSSL);
app.use(compress);
app.use(serveStatic(config.get('docRoot')));



// Set templating engine

app.set('views', config.get('viewRoot'));
app.set('view engine', 'ejs');



// Set http routes

app.get('/', function(req, res){
    res.render('index', {externals: externals, pageTitle: 'Web Rebels ☠ Oslo ☠ 22-23 May 2014' });
});
app.get('/index', function(req, res){
    res.render('index', {externals: externals, pageTitle: 'Web Rebels ☠ Oslo ☠ 2014' });
});
app.get('/sponsors', function(req,res){
    res.render('sponsors', {externals: externals, pageTitle: 'Our sponsors without whom none of this would be possible ☠ Web Rebels ☠ Oslo 2014'});
});
app.get('/sponsoroptions', function(req,res){
    res.render('sponsoroptions', {externals: externals, pageTitle: 'Sponsoring options for the Web Rebels ☠ Oslo 2014'});
});
app.get('/about', function(req,res){
    res.render('about', {externals: externals, pageTitle: '☠ About the Web Rebels ☠'});
});
app.get('/videos', function(req,res){
    res.redirect('http://webrebels.23video.com');
});
app.get('/policies', function(req,res){
    res.render('policies', {externals: externals, pageTitle: '☠ Policies for the Web Rebels ☠'});
});
app.get('/tickets', function(req,res){
    res.render('tickets', {externals: externals, pageTitle: 'Tickets for the Web Rebels ☠ Oslo 2014'});
});
app.get('/ticketConfirmation', function(req,res){
    res.render('ticketConfirmation', {externals: externals, pageTitle: 'Thank you for registering with the Web Rebels ☠ Oslo 2014'});
});
app.get('/location', function(req,res){
    res.render('location', {externals: externals, pageTitle: 'Location of the Web Rebels ☠ Oslo 2014'});
});
app.get('/oslo', function(req,res){
    res.render('oslo', {externals: externals, pageTitle: 'Oslo survival guide for Web Rebels ☠ Oslo 2014'});
});
app.get('/family', function(req,res){
    res.render('family', {externals: externals, pageTitle: 'Family guide for Web Rebels ☠ Oslo 2014'});
});
app.get('/openmic', function(req,res){
    res.render('openmic', {externals: externals, pageTitle: 'Open Mic Night - Web Rebels ☠ Oslo 2014'});
});
app.get('/schedule', function(req,res){
    res.render('schedule', {externals: externals, pageTitle: 'Schedule for Web Rebels ☠ Oslo 2014'});
});
app.get('/speakers', function(req,res){
    res.render('speakers', {externals: externals, pageTitle: 'Speakers - Web Rebels ☠ Oslo 2014'});
});
app.get('/roadbook', function(req,res){
    res.render('roadbook', {externals: externals, pageTitle: 'Speakers Roadbook - Web Rebels ☠ Oslo 2014'});
});

// Node school tour stuff
app.get('/tour', function(req,res){
    res.render('tour/index', {pageTitle: 'Web Rebels ☠ Nodeschool.io Tour of Norway'});
});
app.get('/tour/oslo', function(req,res){
    res.render('tour/oslo', {pageTitle: 'Oslo Nodeschool at Fronter AS'});
});
app.get('/tour/bartcity', function(req,res){
    res.render('tour/bartcity', {pageTitle: 'Trondheim Nodeschool at Fronter AS'});
});
app.get('/tour/bergen', function(req,res){
    res.render('tour/bergen', {pageTitle: 'Bergen Nodeschool at Fronter AS'});
});
app.get('/tour/tv', function(req,res){
    res.render('tour/slowtv', {pageTitle: 'Nodeschool Norway Tour - live coverage'});
});



// Export application

module.exports = app;
