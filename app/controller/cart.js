var Order = require("../models/order");

var checkCart = function(cart, data, cb){
		if (cart.shop.id != data.shop.id){
			cb(new Error("only one shop allowed"), null);
			return;
		}
		for (i = 0; i<cart.items.length; i++){
			if (cart.items[i].name == data.item.name){
				cb(null, true, i);
				return;
			}
		}
		cb(null, false, null);
	};

module.exports ={
	openCart: function(session, data, cb){
		var cart = {
			"user" : session,
			"shop" : {
				"id" : data.shop.id,
				"name" : data.shop.name
			},
			"items" : [{
				"name" : data.item.name,
				"amount" : 1,
				"price" : data.item.price
			}]
		};
		cb (cart);
	},

	addtoCart: function(cart, data, cb){
		checkCart(cart, data, function(err, exist, place){
			if(!err){
				if (!exist){
					cart.items.push({
						"name" : data.item.name,
						"amount" : 1,
						"price" : data.item.price
					});
					cb(null, cart);
					return;
				}
				cart.items[place].amount++;
				cb(null, cart);
				return;
			}
			cb(err, null);
		});		
	},

	setAmountofCart: function(cart, data, cb){
		checkCart(cart, data, function(err, exist, place){
			if(!err){
				if (!exist){
					cb(new Error("no such item"), null);
					return;
				}
				cart.items[place].amount=data.item.amount;
				cb(null, cart);
			}
			cb(err, null);
		});
	},

	removefromCart: function(cart, data, cb){
		checkCart(cart, data, function(err, exist, place){
			if(!err){
				if (!exist){
					cb(new Error("no such item"), null);
					return;
				}
				delete cart.items[place];
				cb(null, cart);
				return;
			}
			cb(err, null);
		});
	},

	placeOrder: function(cart, time, cb){
		var order = require('./cart');
		var user = require('./profile');
		
		user.getByID(cart.user ,function(err, user){
			if (!err){
				var document = Order.create(order.parseDatatoOrder(cart, user.first_name+" "+user.last_name, time));
				try {
                    document.save(function (error) {
                        cb(null, 123);
                    });
                } catch (error) {
                    cb(error, null);
                }
			} else {
				cb(err, null);
			}
		});
	},

	parseDatatoOrder: function(data, username, time){
		var order = {
			"timestamp": Date(),
			"type": "order",
			"shop": data.shop,
			"user": {
				"id": data.user,
				"name": username
			},
			"items": data.items,
			"status": "ordered",
			"fetchtime": time
		};
		return order;
	}
}
