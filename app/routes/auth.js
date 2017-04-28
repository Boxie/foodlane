var pug = require('pug');

module.exports = function(router, passport) {
    'use strict';
    // This will handle the url calls for /login/ROUTE

    router.route('/login')
        .get(function(req, res, next) {
            if(req.isAuthenticated()) {
                console.log(req.user);
                res.send("Hello " + req.user.first_name + " " + req.user.last_name);
            } else {
                res.render("login");
            }
        }).post(function(req, res, next) {
        // The local login strategy
            passport.authenticate('local', function(err, user) {
                if (err) {
                    return next(err);
                }

                // Technically, the user should exist at this point, but if not, check
                if(!user) {
                    res.redirect("/login");
                }

                // Log the user in!
                req.logIn(user, function(err) {
                    if (err) {
                        return next(err);
                    }
                    console.log(user.username + ' just logged in ' + req.isAuthenticated());
                    req.session.user_id = req.user.id;

                    res.send("profile");
                    return next();
                });

            })(req, res, next);
        });

    // route /logout
    router.route('/logout')
        .get(function(req, res, next) {
            if(req.isAuthenticated()) {
                logout(req);
            } else {
                res.render("login");
            }
        }).post(function(req, res, next) {
        // The local login strategy
        logout(req);
    });
};

function logout(req){

}