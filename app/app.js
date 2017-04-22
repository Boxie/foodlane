

// /index.js
'use strict';

var server = require('./config/initializers/server');
var config = require('config');
var async = require('async');
var logger = require('winston');

logger.info('[APP] Starting server initialization');

// Initialize Modules
async.series([
        function initializeDBConnection(callback) {
            require('./config/initializers/database')(callback);
        },
        function startServer(callback) {
            server(callback);
        }], function(err) {
        if (err) {
            logger.error('[APP] initialization failed', err);
        } else {
            logger.info('[APP] initialized SUCCESSFULLY');
        }
    }
);

