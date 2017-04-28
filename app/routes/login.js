var pug = require('pug');

module.exports = function(router, passport) {
    'use strict';
    // This will handle the url calls for /users/:user_id

    router.route('/')
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

                    if(user.username) {
                        res.json({ success: 'Welcome ' + user.username + "!"});
                        return next();
                    }

                    res.json({ success: 'Welcome!'});
                    return next();
                });

            })(req, res, next);
        });
};