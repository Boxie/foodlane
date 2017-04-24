var pug = require('pug');

module.exports = function(router) {
    'use strict';
    // This will handle the url calls for /users/:user_id

    router.route('/')
        .get(function(req, res, next) {
            res.render("login");
        }).post(function(req, res, next) {

    });
};