/**
 * Created by Lukas on 22.04.17.
 */

var db = require('./../../../helpers/database');
var logger = require('winston');
var User = require("../../../models/User");
var auth = require("../../../controller/auth");

var request = require('request');

module.exports = function(cb) {


    logger.info("[DATABASE] Filling database with sample data");

    var sampleUsers = require('./users.json');
    addUsers(sampleUsers, function (){
        logger.info("[DATABASE] Filled database with sample data SUCCESSFULLY");
    });

};

function addUsers(body, cb){

    body.forEach(function (data){
        var document = User.create(auth.parseDataToUser(data));
        try{
            document.save(function(error){

            });
        } catch (error) {
            console.log("Validation failed.");
        }

    });
    cb();
}