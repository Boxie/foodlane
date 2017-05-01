/**
 * Created by Lukas on 01.05.17.
 */
var User = require("../models/User");
var async = require("async");

module.exports = {
    uniqueEmail: function(email, cb){
        if(!email){

            cb(new Error("Email must be present"), null);
            return;
        }
        User.findManyByEmail([email],function(error,result){
            if(!error){
                var size = Object.keys(result).length;
                //found something
                if(size === 1){

                    //email is in use by other doc
                    cb(new Error("Email already in use"),false);
                    return;
                }
                // email is unique
                if(size === 0){
                    cb(null, true);
                    return;
                }
                throw new Error("Found more than 1 doc with same email!");
            } else {
                cb (error, null);
            }
        })
    },

    uniqueUsername: function(username, cb){
        if(!username){

            cb(new Error("Username must be present"), null);
            return;
        }
        User.findManyByUsername([username],function(error,result){
            if(!error){
                var size = Object.keys(result).length;
                //found something
                if(size === 1){

                    //username is in use by other doc
                    cb(new Error("Username already in use"), false);
                    return;
                }
                // username is unique
                if(size === 0){
                    cb(null, true);
                    return;
                }
                throw new Error("Found more than 1 doc with same username!");
            } else {
                cb(error, null);
            }
        })
    },

    register: function(data, cb){

        if(data.password != data.repeatpassword){
            return (new Error("Passwords not equal"));
        }
        async.parallel({

            username: function(callback){
                var auth = require("./auth");
                auth.uniqueUsername(data.username, callback);
            },
            email: function(callback){
                var auth = require("./auth");
                auth.uniqueEmail(data.email, callback);
            },
        }, function(err, result){
            if(!err){
                var auth = require("./auth");

                var document = User.create(auth.parseDataToUser(data));

                try {
                    document.save(function(error) {
                        cb(null,document);
                    });
                } catch (error){
                    cb(error,null);
                }

            } else {
                cb(err, null);
            }
        });
    },

    checkCredentials: function(username, password, cb){
        User.findManyByCredentials([username,password], function(err, result) {
            if (!err) {

                var size = Object.keys(result).length;
                if(size === 1){

                    cb(null, result[0]);
                    return;
                }
                if(size === 0){
                    cb(null, null);
                    return;
                }

                cb(new Error("Found more than 1 user with same credentials."));
                return;
            }
        })
    },

    parseDataToUser: function(data){
        var user = {
            "type": "user",
            "email": data.email,
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
        return user;
    }
}