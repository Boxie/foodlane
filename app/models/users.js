var db = require("../helpers/database");

module.exports = {
    getUserByID: function(doc_id, cb) {
        db.get(doc_id, function(err, body){
            if(!err){
                if(body.type === "user"){
                    return cb(err, body);
                }
                throw new Error("Found document with false type.");
            }
            return cb(err);
        });
    },

    checkCredentials: function(username, password, cb){
        db.view('users','username_password', {
            key: [username, password], include_docs: true
        }, function(err, body) {
            if (!err) {
                var size = Object.keys(body.rows).length;
                console.log("SIZE: " + size);
                if(size === 1){
                    console.log(body.rows[0].doc);
                    var doc = body.rows[0].doc;
                    cb(doc);
                }
                if(size === 0){
                    cb(null);
                }
                cb(new Error("Found more than 1 user with same credentials."));
            }
        });
    }
};