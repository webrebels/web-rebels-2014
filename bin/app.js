/* jshint node: true, strict: true */

"use strict";

var http                = require('http'),
    config              = require('./config.js'),
    log                 = require('./log.js'),
    express             = require('express'),
    winston             = require('winston'),
    app                 = express();



app.disable('x-powered-by');

app.configure('all',function () {
    app.use(express.compress());
    app.use(express.static(config.get('docRoot')));
});



// Set templating engine

app.set('views', 'views');
app.set('view engine', 'ejs');



// Set http routes

app.get('/', function(req, res){
    res.render('frontpage', { pageTitle: 'Web Rebels ☠ Oslo ☠ 2014' });
});

app.get('/sponsorsoptions', function(req, res){
    res.render('sponsorsoptions', {pageTitle: 'Sponsoring options for Web Rebels ☠ Oslo ☠'});
})




// Set up http server

var httpServer = http.createServer(app);



// Export application

module.exports = httpServer;
