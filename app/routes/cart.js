var pug = require('pug');
var shop = require("../controller/shopController");

module.exports = function (router) {
    'use strict';
    // This will handle the url calls for /search/ROUTE

    router.route('/')
    	.get(function (req, res, next){
    		if (req.session.cart){
	    		res.render("cart", {
	    			"authstate" : req.isAuthenticated(),
	    			"cart" : req.session.cart
	    		});
	    	} else {
	    		res.redirect("/auth/login");
	    	}
    	})
    	.post(function(req, res, next){
            var itemname = req.body.itemname;
            var itemprice = req.body.itemprice;
            if (!req.session.cart){
                var itemname
                req.session.cart = [{itemname: itemname, itemprice : itemprice}];
            } else {
                req.session.cart.push({itemname: itemname, itemprice : itemprice});
            }
            res.sendStatus(201);
        });
 };