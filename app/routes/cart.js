var pug = require('pug');
var cart = require("../controller/cart");

module.exports = function (router) {
    'use strict';
    // This will handle the url calls for /cart

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
            switch(req.body.mode){
            	case 'add':
            		if(!req.session.cart){
            			cart.openCart(
            				req.session.user_id,{
            					"shop" :{
            						"id" : req.body.shop.id,
            						"name" : req.body.shop.name
            					},
            					"item" :{
            						"name" :req.body.item.name,
            						"price" : req.body.item.price
            					}	
            				}, 
            				function(edit){
            					req.session.cart = edit;
            					res.sendStatus(200);
            				}
            			);
            		} else {
            			cart.addtoCart(
            				req.session.cart, {
            					"shop" :{
            						"id" : req.body.shop.id,
            						"name" : req.body.shop.name
            					},
            					"item" :{
            						"name" :req.body.item.name,
            						"price" : req.body.item.price
            					}
            				},
            				function(err, edit){
            					if (!err){
            						req.session.cart = edit;
            						res.sendStatus(200);
            					} else {
        							res.sendStatus(500);
        						} 
            				}
            			);
            		}
            		break;
            	case 'set':
            		cart.setAmountofCart(
        				req.session.cart, {
        					"shop" :{
        						"id" : req.body.shop.id,
        						"name" : req.body.shop.name
        					},
        					"item" :{
        						"name" :req.body.item.name,
        						"amount" : req.body.item.amount
        					}
        				},
        				function(err, edit){
        					if (!err){
        						req.session.cart = edit;
        						res.sendStatus(200);
        					} else {
        						res.sendStatus(500);
        					} 
        				}
        			);
        			break;
            	case 'remove':
            		cart.removefromCart(
        				req.session.cart, {
        					"shop" :{
        						"id" : req.body.shop.id,
        						"name" : req.body.shop.name
        					},
        					"item" :{
        						"name" :req.body.item.name
        					}
        				},
        				function(err, edit){
        					if (!err){
        						req.session.cart = edit;
        						res.sendStatus(200);
        					} else {
        						res.sendStatus(500);
        					}
        				}
        			);
        			break;
        		case 'save':
        			cart.placeOrder(req.session.cart, req.body.time, function(err, ordernumber){
        				if (!err){
        					res.status(201).send("Your Order number is: "+ordernumber);
        				} else {
        					res.sendStatus(500);
        				}
        			});
        			break;
        		default:
        			res.sendStatus(400); 
            }
        });
 };