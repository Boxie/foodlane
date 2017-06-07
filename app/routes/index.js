/**
 * Created by Lukas on 22.04.17.
 */


var changeCase = require('change-case');
var express = require('express');
var routes = require('require-dir')();
var shop = require('../controller/shopController');

module.exports = function (app, passport) {
    'use strict';

    // Initialize all routes
    Object.keys(routes).forEach(function (routeName) {
        var router = express.Router();
        // You can add some middleware here
        // router.use(someMiddleware);

        // Initialize the route to add its functionality to router
        require('./' + routeName)(router, passport);

        // Add router to the speficied route name in the app
        app.use('/' + changeCase.paramCase(routeName), router);

    });

    app.use(function (req, res, next) {
        res.status(404).render("index", {
            "authstate": req.isAuthenticated(),
	    "shops": [{shopTitle: 'Pseudo-Roccos', desc: 'vernünftje Pizza'},
		 {shopTitle:'Findburger'}, {shopTitle:'Detlefs'}, {shopTitle:'Awesome Sausage'}, {shopTitle:'Fett-Börger'}, {shopTitle:'El Pollo Loco'}, {shopTitle:'zur Kartoffel'}]
        });
    });

};


