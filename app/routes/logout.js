var pug = require('pug');

module.exports = function(router, passport) {
    'use strict';
    // This will handle the url calls for /users/:user_id

    router.route('/')
        .get(function(req, res, next) {
            if(req.isAuthenticated()) {
                req.logout();
                res.redirect("/");
            } else {
                res.render("login");
            }
        }).post(function(req, res, next) {
        // The local login strategy
            req.logout();
            res.redirect("register");
    });
};