/*jshint es5:true node:true*/

"use strict";

var config              = require('./config.js'),
    http                = require('http'),
    express             = require('express'),
    winston             = require('winston'),
    app                 = express(),
    httpServer          = http.createServer(app);

var log = new (winston.Logger)({
    exitOnError : false,
    transports  : [
        new (winston.transports.Console)({
            silent              : config.get('logConsoleSilent'),
            level               : config.get('logConsoleLevel')
        }),

        new (winston.transports.File)({
            filename            : config.get('logFileFileName'),
            silent              : config.get('logFileSilent'),
            level               : config.get('logFileLevel'),
            handleExceptions    : true
        })
    ]
});


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

// Start http server

httpServer.listen(config.get('httpServerPort'));
log.info('WR2014 is running at http://localhost:' + config.get('httpServerPort') + '/');
log.info('Serving documents from ' + config.get('docRoot'));



// Prevent exceptions to bubble up to the top and eventually kill the server

process.on("uncaughtException", function (err) {
    log.error(err.stack);
});

