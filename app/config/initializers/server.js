/**
 * Created by Lukas on 22.04.17.
 */

var express = require('express');
var passport = require('passport');

var path = require('path');

// Local dependecies
var config = require('config');
var serverConfig = config.get('foodlane.serverConfig');

var bodyParser = require("body-parser");

// create the express app
// configure middlewares
var logger = require('winston');
var app;

var start =  function(cb) {
    'use strict';
    // Configure express
    app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    //set Paths
    app.set("views", path.join(__dirname, "../../views"));
    app.use(express.static(path.join(__dirname, '../../public')));

    logger.info('[SERVER] Initializing passport');
    require('../pass')(app, passport);

    logger.info('[SERVER] Initializing routes');
    require('../../routes/index')(app, passport);

    app.use(express.static(path.join(__dirname, 'public')));

    // Set PugJS as view engine
    app.set('view engine', 'pug');


    app.listen(serverConfig.get('NODE_PORT'));
    logger.info('[SERVER] Listening on port ' + serverConfig.get('NODE_PORT'));

    if (cb) {
        return cb();
    }
};

module.exports = start;

