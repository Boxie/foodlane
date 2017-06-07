/**
 * Created by Lukas on 22.04.17.
 */

var logger = require('winston');
var config = require('config');
var dbConfig = config.get('foodlane.dbConfig');
var dbAddress = dbConfig.protocol + '://' + dbConfig.username + ':' + dbConfig.password + "@" + dbConfig.host + ':' + dbConfig.port;

var nano = require('nano')(dbAddress);

function createViewsForUsers(db) {
    db.insert(
        {
            "views": {
                "by_username": {
                    "map": function (doc) {
                        if (doc.type === "user") {
                            emit([doc.username], doc);
                        }
                    }
                },
                "by_email": {
                    "map": function (doc) {
                        if (doc.type === "user") {
                            emit([doc.email], doc);
                        }
                    }
                },
                "by_credentials": {
                    "map": function (doc) {
                        if (doc.type === "user") {
                            emit([doc.username, doc.password], doc);
                        }
                    }
                }
            }
        }, '_design/users'
    );
}

function createViewsForShops(db) {
    db.insert(
        {
            "views": {
                "by_shopTitle": {
                    "map": function (doc) {
                        if (doc.type === "shop") {
                            emit([doc.shopTitle], doc);
                        }
                    }
                },
                "by_shopTitleAndOnlySearchData": {
                    "map": function (doc) {
                        if (doc.type === "shop") {
                            emit([doc.shopTitle], {
                                _id: doc._id,
                                shopTitle: doc.shopTitle,
                                latitude: doc.latitude,
                                longitude: doc.longitude,
                                description: doc.description
                            });
                        }
                    }
                }
            }
        }, '_design/shops'
    );
}

function createViewsForOrders(db) {
    db.insert(
        {
            "views" : {
                "by_User_all": {
                    "map": function(doc) {
                        if (doc.type === "order") {
                            emit([doc.user.id], doc);
                        }
                    }
                },
                "by_User_ordered": {
                    "map": function(doc) {
                        if(doc.type === "order" && doc.status != "fetched") {
                            emit([doc.user.id], doc);
                        }
                    }
                },
                "by_Shop_all": {
                    "map": function(doc) {
                        if (doc.type === "order") {
                            emit([doc.shop.id], doc);
                        }
                    }   
                },
                "by_Shop_ordered": {
                    "map": function(doc) {
                        if(doc.type === "order" && doc.status != "fetched") {
                            emit([doc.shop.id], doc);
                        }
                    }
                }
            }
        }, '_design/orders'
    );
}

function setupDatabase() {
    nano.db.create(dbConfig.database, function (err, cb) {

        // on error while creating
        if (err) {
            logger.error('[DATABASE] Failed to create Database \"' + dbConfig.database + "\"");
        }

        // created Database successfully
        logger.info('[DATABASE] Created database \"' + dbConfig.database + "\" SUCCESSFULLY");

        // Generate sample Data

        if (dbConfig.sampleData) {
            require('./sampleData/dbSampleData')(cb);
        }

        createViewsForUsers(nano.db.use(dbConfig.database));
        createViewsForShops(nano.db.use(dbConfig.database));
        createViewsForOrders(nano.db.use(dbConfig.database));

    });
}
module.exports = function (cb) {
    'use strict';
    // Initialize the component here then call the callback
    // More logic

    logger.info("[DATABASE] Initialize Database");

    nano.db.list(function (err, body) {

        if (err) {
            logger.error("[FATAL] Failed to connect to Database");
            return;
        }

        var foundDatabase = false;
        // body is an array
        body.forEach(function (db) {
            if (db === dbConfig.database) {
                logger.info('[DATABASE] Database FOUND');
                foundDatabase = true;
                if (dbConfig.initSampleDataEverytime) {
                    nano.db.destroy(db);
                    logger.info('[DATABASE] Database DESTROYED');
                    foundDatabase = false;
                }
            }
        });

        if (!foundDatabase) {
            setupDatabase();
        }
    });

    logger.info('[DATABASE] Initialized Database SUCCESSFULLY');
    // Return the call back
    cb();
};