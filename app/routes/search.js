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
                } else {
                    res.render("noresults");
                }
            });
        });

    router.route('/shop/:shopID')
        .get(function(req, res, next){
            shop.getShopByID(req.params.shopID, function(err, shop){
                if (!err) {
                    res.render("menu", {
                        "authstate": req.isAuthenticated(),
                        "shop": shop
                    });
                } else {
                    res.render("noresults");
                }
            })
        });
};