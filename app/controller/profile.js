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
    },

    updateData: function(id, change, cb){
    	var profile = require("./profile");
    	profile.getByID(id, function(err, doc){
    		var document = profile.checkdifferences(doc, change);
    		if (document){
    			try {
                    document.save(function(error) {
                        cb(null);
                    });
                } catch (error){
                    cb(error.detail);
                }
            } else {
            	cb('error');
            }
    	})	
    },

    checkdifferences: function(data,change){
    	var password;
    	var street;
    	var number;
    	var postcode;
    	var city;
    	if (!(change.street ==="")){
    		data.address.street = change.street;
    	}
    	if (!(change.number ==="")){
    		data.addressnumber = change.number;
    	}
    	if (!(change.postcode ==="")){
    		data.address.postcode = change.postcode;
    	}
    	if (!(change.city ==="")){
    		data.address.city = change.city;
    	}
    	if (!(change.oldpassword ==="")){
	    	if (data.password === change.oldpassword){
	    		if (change.newpassword === change.newpasswordrepeat){
	    			data.password = change.newpassword;
	    		}else{
	    			return false;
	    		}
	    	}else{
	    		return false;
	    	}
	    }
	    return data;
    }


}