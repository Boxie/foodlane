var db = require("../helpers/database");

module.exports = {
    getUserByID: function(doc_id) {
        db.get(doc_id, function(err, body){
            if(!err){
                console.log(body);
                return body;
            }
            return null;
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
                    console.log("WRONG");
                    cb(null);
                }
                return new Error("Found more than 1 user with same credentials.");
            }
        });
    }
};