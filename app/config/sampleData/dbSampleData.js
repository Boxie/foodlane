/**
 * Created by Lukas on 22.04.17.
 */

var db = require('./../../helpers/database');
var logger = require('winston');

var request = require('request');

module.exports = function(cb) {


    logger.info("[DATABSE] Filling database with sample data");

    var sampleUsers = require('./users.json');
    addUsers(sampleUsers, logger.info("[DATABSE] Filled database with sample data SUCCESSFULLY"));

};

function addUsers(body){

    body.forEach(function (data, cb){
        var user = {
            "_id": data.email,
            "type": "user",
            "username": data.username,
            "password": data.password,
            "first_name": data.first_name,
            "last_name": data.last_name,
            "address": {
                "street": data.street,
                "number": data.number,
                "postcode": data.postcode,
                "city": data.city
            }
        };
        db.insert(user);
    });
}