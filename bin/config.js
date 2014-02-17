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
        env     : "NODE_ENV",
        arg     : "env"
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
        default : "./public/src",
        env     : "NODE_HTTP_DOC_ROOT"
    },

    viewRoot: {
        doc     : "Document root for EJS templates used by Express",
        format  : "*",
        default : "./views",
        env     : "NODE_HTTP_VIEW_ROOT"
    },

    wsPath: {
        doc     : "Path of the public websocket",
        format  : "*",
        default : "/api/stream",
        env     : "NODE_WS_PATH"
    },

    logConsoleLevel: {
        doc     : "Which level the console transport log should log at",
        format  : "*",
        default : "info",
        env     : "NODE_LOG_CONSOLE_LEVEL",
        arg     : "log-console-level"
    },

    logConsoleSilent: {
        doc     : "If the console transport log should be silent or not",
        format  : "*",
        default : false,
        env     : "NODE_LOG_CONSOLE_SILENT",
        arg     : "log-console-silent"
    },

    jsFiles: {
        doc     : "Non minified JavaScript files - Use relative path to 'docRoot'",
        format  : Array,
        default : ['/js/**/*'],
        env     : "NODE_JS_FILES"
    },

    cssFiles: {
        doc     : "Non minified CSS files - Use relative path to 'docRoot'",
        format  : Array,
        default : ['/css/**/*'],
        env     : "NODE_CSS_FILES"
    },

    gfxFiles: {
        doc     : "Source graphic files - Use relative path to 'docRoot'",
        format  : Array,
        default : ['/img/**/*'],
        env     : "NODE_GFX_FILES"
    },

    fontFiles: {
        doc     : "Source font files - Use relative path to 'docRoot'",
        format  : Array,
        default : ['/webfonts/**/*'],
        env     : "NODE_FONT_FILES"
    },

    jsMinFile: {
        doc     : "Minified JavaScript file",
        format  : Array,
        default : ['/js/scripts.min.js'],
        env     : "NODE_JS_MIN_FILE"
    },

    cssMinFile: {
        doc     : "Minified CSS file",
        format  : Array,
        default : ['/css/styles.min.css'],
        env     : "NODE_CSS_MIN_FILE"
    }

});



// Load and validate configuration depending on environment

var env = conf.get('env');
conf.loadFile('./config/' + env + '.json');
conf.validate();



// Export merged configuration to the application

module.exports = conf;
