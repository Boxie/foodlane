/**
 * Created by Lukas on 28.04.17.
 */

var pug = require('pug');
var profile = require("../controller/profile");

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
                profile.getByID(req.session.user_id, function(err, user){
                    if(!err){
                        res.render("profile", {
                            "authstate": req.isAuthenticated(),
                            "user" : user
                        });
                        return;
                    }
                    res.redirect('/auth/login');
                });
            }else{
                res.redirect('/auth/register');
            }
        }).post(function(req, res, next) {
    });

    router.route('/edit')
        .get(function(req,res,next) {
            if (req.isAUthenticed()){
                res.send('work in progress');
            } else {
                res.redirect('/auth/login');
            }
        })
};