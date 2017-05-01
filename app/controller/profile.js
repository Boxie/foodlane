/**
 * Created by Lukas on 01.05.17.
 */

var User = require("../models/User");

module.exports = {
    getByID: function(doc_id, cb){
        User.findOneByID(doc_id, function(err, doc){
            if(!err){
                cb(null, doc)
            } else {
                cb(err, null);
            }
        });
    }
}