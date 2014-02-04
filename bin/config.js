/* jshint node: true, strict: true */

"use strict";

var convict = require('convict'),
    pckage  = require('../package.json');


// Configuration schema

var conf = convict({
env: {

    doc: "Applicaton environments",
        format  : ["development", "production"],
        default : "development",
        env     : "NODE_ENV"
    },

    version: {
        doc     : "Version of the application",
        format  : "*",
        default : pckage.version,
        env     : "NODE_VERSION"
    },

    httpServerPort: {
        doc     : "The port the server should bind to",
        format  : "port",
        default : 8000,
        env     : "NODE_HTTP_SERVER_PORT"
    },

    docRoot: {
        doc     : "Document root for static files to be served by the http server",
        format  : "*",
        default : "./public",
        env     : "NODE_HTTP_DOC_ROOT"
    },

    logConsoleLevel: {
        doc     : "Which level the console transport log should log at",
        format  : "*",
        default : "info",
        env     : "NODE_LOG_CONSOLE_LEVEL"
    },

    logConsoleSilent: {
        doc     : "If the console transport log should be silent or not",
        format  : "*",
        default : false,
        env     : "NODE_LOG_CONSOLE_SILENT"
    },

    logFileLevel: {
        doc     : "Which level the file transport log should log at",
        format  : "*",
        default : "info",
        env     : "NODE_LOG_FILE_LEVEL"
    },

    logFileSilent: {
        doc     : "If the file transport log should be silent or not",
        format  : "*",
        default : false,
        env     : "NODE_LOG_FILE_SILENT"
    },

    logFileFileName: {
        doc     : "Which file the file transport log should log to",
        format  : "*",
        default : "./logs/" + pckage.name + ".log",
        env     : "NODE_LOG_FILE_FILE_NAME"
    }

});



// Load and validate configuration depending on environment

var env = conf.get('env');
conf.loadFile('./config/' + env + '.json');
conf.validate();



// Export merged configuration to the application

module.exports = conf;
