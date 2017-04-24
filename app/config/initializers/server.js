/**
 * Created by Lukas on 22.04.17.
 */

var express = require('express');
var path = require('path');
// Local dependecies
var config = require('config');
var serverConfig = config.get('foodlane.serverConfig');

// create the express app
// configure middlewares
var logger = require('winston');
var app;

var start =  function(cb) {
    'use strict';
    // Configure express
    app = express();

    logger.info('[SERVER] Initializing routes');
    require('../../routes/index')(app);

    app.use(express.static(path.join(__dirname, 'public')));

    // Set PugJS as view engine
    app.set('view engine', 'pug');

    //set Paths
    app.set("views", path.join(__dirname, "../../views"));
    app.use(express.static(path.join(__dirname, '../../public')));

    app.listen(serverConfig.get('NODE_PORT'));
    logger.info('[SERVER] Listening on port ' + serverConfig.get('NODE_PORT'));

    if (cb) {
        return cb();
    }
};

module.exports = start;

