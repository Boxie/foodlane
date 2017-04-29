/**
 * Created by Lukas on 28.04.17.
 */

var pug = require('pug');
var User = require("../models/users");

module.exports = function(router, passport) {
    'use strict';
    // This will handle the url calls for /users/:user_id
    router.route('/:userId')
        .get(function(req, res, next) {
            // Return user
            res.render("userform");
        })
        .put(function(req, res, next) {
            // Update user
        })
        .patch(function(req, res,next) {
            // Patch
        })
        .delete(function(req, res, next) {
            // Delete record
        });

    router.route('/')
        .get(function(req, res, next) {
            if (req.isAuthenticated()){
                //set user to json file by id
                //var user = User.getUserById(req.session.user_id);
                res.render("userform", {"authstate": req.isAuthenticated(), "mode" : "edit", "user" : user});
            }else{
                res.redirect('/register');
            }
        }).post(function(req, res, next) {
    });
};