/**
 * Created by Lukas on 22.04.17.
 */

var db = require('./database');
var logger = require('winston');

var request = require('request');

const sampleUserLink = "https://www.mockaroo.com/2b2cdb90/download?count=1000&key=0cd9f140";
const sampleShopLink = "";
const sampleInvoiceLink = "";

module.exports = function(cb) {


    logger.info("[DATABSE] Filling database with sample data");

    request({
            url: sampleUserLink,
            json: true
        },
        function (error, response, body) {
            addUsers(body);
            logger.info("[DATABSE] filled database with sample data SUCCESSFULLY");
        });

};

function addUsers(body){

    body.forEach(function (data){
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