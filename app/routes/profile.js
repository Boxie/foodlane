/**
 * Created by Lukas on 28.04.17.
 */

var pug = require('pug');
var profile = require("../controller/profile");
var order = require("../controller/order");

module.exports = function (router, passport) {
    'use strict';

    router.route('/')
        .get(function (req, res, next) {
            if (req.isAuthenticated()) {
                //set user to json file by id
                profile.getByID(req.session.user_id, function (err, user) {
                    if (!err) {
                        order.getAllforUser(req.session.user_id, function(errorders, orders){
                            if(!errorders) {
                                order.getPendingforUser(req.session.user_id, function(errpending, pending){
                                    if (!errpending){
                                        res.render("profile", {
                                            "authstate": req.isAuthenticated(),
                                            "user": user,
                                            "pending": pending,
                                            "orders": orders
                                        });
                                    } else {
                                        res.render("profile", {
                                            "authstate": req.isAuthenticated(),
                                            "user": user,
                                            "pending": false,
                                            "orders": orders
                                        });
                                    }
                                });
                            } else {
                                res.render("profile", {
                                    "authstate": req.isAuthenticated(),
                                    "user": user,
                                    "pending": false,
                                    "orders": false
                                });
                            }
                        });
                    } else {
                        res.redirect('/auth/login');
                    }
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