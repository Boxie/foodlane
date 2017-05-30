/**
 * Created by daniel.mueller on 27.05.17.
 */

var Shop = require("../models/Shop");

module.exports = {
    parseDataToShop: function (data) {
        var shop = {
            "type": "shop",
            "shopTitle": data.shopTitle,
            "latitude": data.latitude,
            "longitude": data.longitude,
            "address": data.address,
            "description": data.description,
            "items": data.items
        };
        return shop;
    },

    getAllShops: function (cb) {
        Shop.findManyByView("_design/shops/_view/by_shopTitleAndOnlySearchData", "", function (err, doc) {
            if (!err) {
                cb(null, doc)
            } else {
                cb(err, null);
            }
        })
    }
};