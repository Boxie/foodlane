/**
 * Created by Lukas on 27.04.17.
 */
var LocalStrategy = require('passport-local').Strategy;

var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var User = require("../models/users");

module.exports = function(app, passport) {


    // Initialize passport

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(require('express-session')({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: false
    }));
    app.use(passport.initialize());
    app.use(passport.session());


    // This is how a user gets serialized
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });

    });

    // Lookup a user in our database
    var lookupUser = function (username, password, done) {
        console.log("Username:" + username);
        console.log("Password:" + password);
        if (username === 'lukas@boehme.com' && password === 'my_password') {
            return done(null, {id: 123456, username: 'lukas@boehme.com'});
        }

        return done(null, false, {error: 'Incorrect username or password.'});
    };

    passport.use(new LocalStrategy({usernameField: 'username', session: true}, lookupUser));
}