/**
 * Created by Lukas on 22.04.17.
 */
var config = require('config');
var dbConfig = config.get('foodlane.dbConfig');

var logger = require('winston');
var dbAddress = dbConfig.protocol + '://' + dbConfig.username + ':' + dbConfig.password + "@" + dbConfig.host + ':' + dbConfig.port;
'use strict';

logger.info('[DATABASE]  to CouchDB ' + dbConfig.protocol + '://' + dbConfig.host + ':' + dbConfig.port);
var nano = require('nano')(dbAddress);

logger.info('[DATABASE] connected SUCCESSFULLY');

module.exports = function(cb) {
    'use strict';
    cb();
    return nano;
};