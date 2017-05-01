/**
 * Created by Lukas on 22.04.17.
 */

var logger = require('winston');
var config = require('config');
var dbConfig = config.get('foodlane.dbConfig');
var dbAddress = dbConfig.protocol + '://' + dbConfig.username + ':' + dbConfig.password + "@" + dbConfig.host + ':' + dbConfig.port;

var nano = require('nano')(dbAddress)

function createViews(db){
    db.insert(
        { "views":
            { "by_username":
                { "map":
                    function(doc) {
                        if(doc.type === "user") {
                            emit([doc.username], doc);
                        }
                    }
                },
                "by_email": {
                    "map":
                        function(doc) {
                            if(doc.type === "user") {
                                emit([doc.email], doc);
                            }
                        }
                },
                "by_credentials": {
                    "map":
                        function(doc) {
                            if(doc.type === "user") {
                                emit([doc.username,doc.password], doc);
                            }
                        }
                },
            }
        }, '_design/users'

    );
}

function setupDatabase(){
    nano.db.create(dbConfig.database , function (err, cb) {

        // on error while creating
        if(err){
            logger.error('[DATABASE] Failed to create Database \"' + dbConfig.database +"\"");
        }

        // created Database successfully
        logger.info('[DATABASE] Created database \"' + dbConfig.database +"\" SUCCESSFULLY");

        // Generate sample Data

        if(dbConfig.sampleData){
            require('./sampleData/dbSampleData')(cb);
        }

        createViews(nano.db.use(dbConfig.database));

    });
}
module.exports = function(cb) {
    'use strict';
    // Initialize the component here then call the callback
    // More logic

    logger.info("[DATABSE] Initialize Database");

    nano.db.list(function(err, body) {

        if(err){
            logger.error("[FATAL] Failed to connect to Database");
            return;
        }

        var foundDatabase = false;
        // body is an array
        body.forEach(function(db){
            if(db === dbConfig.database){
                foundDatabase = true;
            }
        });

        if(!foundDatabase){
            setupDatabase();
        }
    });

    logger.info('[DATABASE] Initialized Database SUCCESSFULLY')
    // Return the call back
    cb();
};