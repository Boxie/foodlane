/**
 * Created by daniel.mueller on 28.05.17.
 */
var pug = require('pug');
var shop = require("../controller/shopController");

module.exports = function (router) {
    'use strict';
    // This will handle the url calls for /search/ROUTE

    router.route('/allshops')
        .get(function (req, res, next) {
            shop.getAllShops(function (err, shops) {
                if(!err) {
                    res.render("results", {
                        "shops": shops
                    });
                }
            });
        });
};