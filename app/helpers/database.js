/**
 * Created by Lukas on 22.04.17.
 */
'use strict';

var config = require('config');
var dbConfig = config.get('foodlane.dbConfig');

var dbAddress =     dbConfig.protocol + '://'
                +   dbConfig.username + ':'
                +   dbConfig.password + "@"
                +   dbConfig.host + ':'
                +   dbConfig.port + '/'
                +   dbConfig.database;

var nano = require('nano')(dbAddress);

module.exports = nano;