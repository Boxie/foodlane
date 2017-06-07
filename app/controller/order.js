var orders = require('../models/order');

module.exports = {
	getAllforUser: function(id, cb){
		orders.findManyByView('_design/orders/_view/by_User_all', id, function(err, doc){
			if(!err){
				cb(null, doc);
			} else {
				cb(err, null);
			}
		});
	},
	getPendingforUser: function(id, cb){
		orders.findManyByView('_design/orders/_view/by_User_ordered', id, function(err, doc){
			if(!err){
				cb(null, doc);
			} else {
				cb(err, null);
			}
		});
	},
	getAllforShop: function(id, cb){
		orders.findManyByView('_design/orders/_view/by_Shop_all', id, function(err, doc){
			if(!err){
				cb(null, doc);
			} else {
				cb(err, null);
			}
		});
	},
	getPendingforShop: function(id, cb){
		orders.findManyByView('_design/orders/_view/by_Shop_ordered', id, function(err, doc){
			if(!err){
				cb(null, doc);
			} else {
				cb(err, null);
			}
		});
	}
}