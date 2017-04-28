var pug = require('pug');

module.exports = function(router, passport) {
    'use strict';
    // This will handle the url calls for /login/ROUTE

    router.route('/')
        .get(function(req, res, next) {
			res.render("userform");
        })
};