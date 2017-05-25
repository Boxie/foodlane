/**
 * Created by Lukas on 28.04.17.
 */

var pug = require('pug');
var profile = require("../controller/profile");

module.exports = function (router, passport) {
    'use strict';

    router.route('/')
        .get(function (req, res, next) {
            if (req.isAuthenticated()) {
                //set user to json file by id
                profile.getByID(req.session.user_id, function (err, user) {
                    if (!err) {
                        res.render("profile", {
                            "authstate": req.isAuthenticated(),
                            "user": user
                        });
                        return;
                    }
                    res.redirect('/auth/login');
                });
            } else {
                res.redirect('/auth/register');
            }
        });

    router.route('/edit')
        .post(function (req, res, next) {
            profile.updateData(req.session.user_id, req.body, function (err) {
                if (!err) {
                    res.status(200).send({redirect: "/profile"});
                } else {
                    res.sendStatus(412);
                }
            })
        })
};