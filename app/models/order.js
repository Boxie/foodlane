/**
 * Created by Lukas on 21.04.17.
 */

var dbHandle = require("../helpers/database");
var couchDBModel = require('../middleware/couchdb-model');
var extend = require('extend');

var Order = couchDBModel(dbHandle, {
    views: [
        '_design/orders/_view/by_user_all',
        '_design/orders/_view/by_user_ordered',
        '_design/orders/_view/by_shop_all',
        '_design/orders/_view/by_shop_ordered'
    ],
    constraints: {
    	shop: {
        	presence: true
    	},
    	user: {
    		presence: true
    	},
    	items: {
    		presence: true
    	}
	}
});

// called if created or find
Order.instanceConstructor = function (model, data) {
    couchDBModel.Instance.call(this, model, data);
    // Instance constructor already applied all field in 'data' to 'this'.
    this.type = "order";
};

// function on use
extend(Order.instanceConstructor.prototype, couchDBModel.Instance.prototype, {
});

module.exports = Order;