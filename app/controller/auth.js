module.exports = {
    logout: function(req, cb){
        req.logout();
        cb();
    },

    login: function(req, cb){
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
    }
}