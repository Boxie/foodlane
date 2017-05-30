/**
 * Created by daniel.mueller on 27.05.17.
 */
var dbHandle = require("../helpers/database");
var couchDBModel = require('../middleware/couchdb-model');
var extend = require('extend');

var Shop = couchDBModel(dbHandle, {
    views: [
        '_design/shops/_view/by_shopname'
    ],
    constraints: {
        shopTitle: {
            presence: true
        }
    }
});

// called if created or find
Shop.instanceConstructor = function (model, data) {
    couchDBModel.Instance.call(this, model, data);
    // Instance constructor already applied all field in 'data' to 'this'.
    this.type = "shop";
};

// function on use
extend(Shop.instanceConstructor.prototype, couchDBModel.Instance.prototype, {
});

module.exports = Shop;