/**
 * @author daniel.mueller
 */
//Used for Contoller Tests objects
var assert = require('assert');
var request = require("request");
var authjs = require("../controller/auth");
var cartjs = require("../controller/cart");
var shopjs = require("../controller/shopController");
var profilejs = require("../controller/profile");
var orderjs = require("../controller/order");

//Database connection
var userdb = require("../models/User");
var shopdb = require("../models/shop");
var orderdb = require("../models/order");

var base_url = "localhost:3000/";

// example
describe('Array', function () {
    describe('#indexOf()', function () {
        it('should return -1 when the value is not present', function () {
            assert.equal(-1, [1, 2, 3].indexOf(4));
        });
    });
});


// example
describe("Hello World Server", function() {
    describe("GET /", function() {
        it("returns status code 200", function(done) {
            request.get(base_url, function(error, response, body) {
                assert.equal(200, response.statusCode);
                done();
            });
        });
    });
});


//Controller--------------------------------------------------------------------------------------------------------------------------------------------------->


//Auth *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
//User Samples
var pwexample = {
    "password" : "beispiel",
    "repeatpassword" : "nobeispiel"
};
var userexample = {
    "password" : "beispiel",
    "repeatpassword" : "beispiel",
    "email" : "max.mustermann@beispiel.exa",
    "username" :"sample",
    "first_name" : "Max",
    "last_name" : "Mustermann",
    "address" : {
        "street" : "Hauptstraße",
        "number" : 1,
        "postcode" : 0815,
        "city" : "Beispielhafen"
    }
};
var exampleuserid;
var exampleuserrev;

//User Tests
describe ("controller: Auth", function (){
    describe("uniqueEMail", function(){
        /*it("No data", function(done){
            authjs.uniqueEmail(null,function(err, value){
                if(err){
                    done();
                } else {
                    done(new Error("Unexpected Result."));
                }
            });
        });
        it("Existing EMail throws Error", function(done){
            authjs.uniqueEmail("aallibanf4@examiner.com",function(err, value){
                if(err){
                    done();
                } else {
                    done(new Error("Unexpected Result."));
                }
            });
        });*/
        it("Unique EMail found", function(done){
            authjs.uniqueEmail(userexample.email, done);
        });
    });
    describe("uniqueUsername", function(){
        /*it("No data", function(done){
            authjs.uniqueUsername(null,function(err, value){
                if(err){
                    done();
                } else {
                    done(new Error("Unexpected Result."));
                }
            });
        });
        it("Existing Username throws Error", function(done){
            authjs.uniqueUsername("aantognettin7",function(err, value){
                if(err){
                    done();
                } else {
                    done(new Error("Unexpected Result."));
                }
            });
        });*/
        it("Unique Username found", function(done){
            authjs.uniqueUsername(userexample.username, done);
        }); 
    });
    describe("register", function(done){
        /*it("No data", function(done){
            authjs.register(null, function(err, value){
                if(!err){
                    done(new Error("Unexpected Result."));
                } else {
                    done();
                }
            });
        });
        it("Passwords unequal", function(done){
            authjs.register(pwexample, function(err, value){
                if(!err){
                    done(new Error("Unexpected Result."));
                } else {
                    done();
                }
            });
        });*/
        it("Registering successful", function(done){
            authjs.register(userexample, function(err, value){
                if(err){
                    done(err);
                } else {
                    exampleuserid = value._id;
                    exampleuserrev = value._rev;
                    done();
                }
            });
        });
    });
    describe("checkCredentials", function(done){
        /*it("No data", function(done){
            authjs.checkCredentials(null, null, function(err, value){
                if(!err){
                    done(new Error("Unexpected Result."));
                } else {
                    done();
                }
            });
        });
        it("Username Parameter missing", function(done){
            authjs.checkCredentials(null, userexample.password, function(err, value){
                if(!err){
                    done(new Error("Unexpected Result."));
                } else {
                    done();
                }
            });
        });
        it("Username Parameter wrong", function(done){
           authjs.checkCredentials("Hallo", userexample.password, function(err, value){
                if(!err){
                    done(new Error("Unexpected Result."));
                } else {
                    done();
                } 
            }); 
        });
        it("Passowrd Parameter missing", function(done){
            authjs.checkCredentials(userexample.username, null, function(err, value){
                if(!err){
                    done(new Error("Unexpected Result."));
                } else {
                    done();
                }
            });
        });
        it("Password Parameter wrong", function(done){
           authjs.checkCredentials(userexample.username, "Hallo", function(err, value){
                if(!err){
                    done(new Error("Unexpected Result."));
                } else {
                    done();
                } 
            }); 
        });*/
        it("Checking Credentials successful", function(done){
            authjs.checkCredentials(userexample.username, userexample.password, done);
        });
    });
    after(function(done){
        var document = userdb.create({_id : exampleuserid, _rev: exampleuserrev}) 
        document.delete(function(error) {
            if(!error){
                console.log("Removed user sample data");
                done();
            } else {
                console.log("couldnt remove user sample data");
                console.log(error);
                done(error);
            }
        });
    });
});


//Profile Conroller-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-* 
//Profile samples
var userfinishedexample = {
    "type" :"user",
    "password" : "beispiel",
    "email" : "max.mustermann@beispiel.exa",
    "username" :"sample",
    "first_name" : "Max",
    "last_name" : "Mustermann",
    "address" : {
        "street" : "Kirchplatz",
        "number" : 1,
        "postcode" : 0815,
        "city" : "Beispielhafen"
    }
};
var changeuserexample = {
    "oldpassword": "",
    "newpassword": "",
    "newpasswordrepeat": "",
    "street" : "Kirchplatz",
    "number" : 10,
    "postcode" : 4217,
    "city" : "Altstadt"
};
var changestreetexample = {
    "oldpassword" : "",
    "password" : "",
    "newpasswordrepeat" : "",
    "street" : "Alte Gasse"
};
var changenumberexample = {
    "oldpassword" : "",
    "password" : "",
    "newpasswordrepeat" : "",
    "number" : 5
};
var changepostcodeexample = {
    "oldpassword" : "",
    "password" : "",
    "newpasswordrepeat" : "",
    "postcode" : 420
};
var changecityexample = {
    "oldpassword" : "",
    "password" : "",
    "newpasswordrepeat" : "",
    "city" : "Neustadt"
};
var changepwexample = {
    "oldpassword" : "beispiel",
    "newpassword" : "sample42",
    "newpasswordrepeat" : "sample42"
};
var exampleprofileid;
var exampleprofilerev;

//Profile Tests
describe("controller: profile", function(){
    before(function(done){
        var document = userdb.create(userfinishedexample);
        document.save(function(error){
            if(!error){
                exampleprofileid = document._id;
                exampleprofilerev = document._rev;
                done();
            } else {
                console.log("Couldnt create user sample data");
                console.log(error);
                done(error);
            }
        });
    });
    describe("checkdifferences", function(){
        it("Checking Street", function(){
            assert.equal(changestreetexample.street, profilejs.checkdifferences(userexample, changestreetexample).address.street);
        });
        it("Checking Number", function(){
            assert.equal(changenumberexample.number, profilejs.checkdifferences(userexample, changenumberexample).address.number);
        });
        it("Checking Postcode", function(){
            assert.equal(changepostcodeexample.postcode, profilejs.checkdifferences(userexample, changepostcodeexample).address.postcode);
        });
        it("Checking City", function(){
            assert.equal(changecityexample.city, profilejs.checkdifferences(userexample, changecityexample).address.city);
        });
        it("Checking Password", function(){
            assert.equal(changepwexample.newpassword, profilejs.checkdifferences(userexample, changepwexample).password);
        });
    });
    describe("getByID", function(){
        it("Retrieving by ID successful", function(done){
            profilejs.getByID(exampleprofileid, done);
        });
    });
    describe("updateData", function(){
        it("updating Data successful", function(done){
            profilejs.updateData(exampleprofileid, changeuserexample, function(err, value){
                if(err){
                    done(err);
                } else {
                    exampleprofilerev= value._rev;
                    done();
                }
            });
        });
    });
    after(function(done){
        var document = userdb.create({_id: exampleprofileid, _rev: exampleprofilerev});
        document.delete(function(error){
            if(!error){
                console.log("Removed sample profile data");
                done();
            } else {
                console.log("Couldnt remove sample profile data");
                console.log(error);
                done(error);
            }
        });
    });
});

//ShopController -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
//Shop Samples
var shopexample = {
    "type": "shop",
    "shopTitle": "Beispiel",
    "latitude": 8.15,
    "longitude": 13.24,
    "address": "Muster Ring 24, 12345 Neustadt, Beispielland",
    "description": "sample",
    "items": [
      {
        "name": "Beispielkuchen",
        "price": 8.42
      },
      {
        "name": "Samplebread",
        "price": 16.80
      }
    ]
}
var exampleshopid;
var exampleshoprev;

//Shop Tests
describe("controller: shopController", function(){
    before(function(done){
        var document = shopdb.create(shopexample);
        document.save(function(error) {
            if(!error){
                exampleshopid = document._id;
                exampleshoprev = document._rev;
                done();
            } else {
                console.log("couldnt create shop sample data");
                console.log(error);
                done(error);
            }
        });
    });
    describe("getAllShops", function(){
        it("Retrieving all shops successful", function(done){
            shopjs.getAllShops(done);
        });
    });
    describe("getShopByID", function(){
        it("Retrieving shop by ID successful", function(done){
            shopjs.getShopByID( exampleshopid ,done);
        });
    });
    after(function(done){
        var document = shopdb.create({_id : exampleshopid, _rev : exampleshoprev}) 
        document.delete(function(error) {
            if(!error){
                console.log("Removed shop sample data");
                done();
            } else {
                console.log("couldnt remove shop sample data");
                console.log(error);
                done(error);
            }
        });
    });
});

//CartController -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
//Cart Variables
var examplecartid;
var examplecartrev;
var cartexample;
var addcartexample;
var currcart;
var examplecartshopid;
var examplecartshoprev;
var examplecartprofileid;
var examplecartprofilerev;
        
//Cart Tests
describe("controller: cart", function(){
    before(function(done){
        var document1 = shopdb.create(shopexample);
        document1.save(function(error) {
            if(!error){
                examplecartshopid = document1._id;
                examplecartshoprev = document1._rev;
                var document2 = userdb.create(userfinishedexample);
                document2.save(function(error){
                    if(!error){
                        examplecartprofileid = document2._id;
                        examplecartprofilerev = document2._rev;
                        //Cart Samples
                        cartexample = {
                            "shop" : {
                                "id" : examplecartshopid,
                                "name" : shopexample.shopTitle
                            },
                            "item" : {
                                "name" : shopexample.items[0].name,
                                "amount" : 1,
                                "price" : shopexample.items[0].price
                            }
                        };
                        addcartexample = {
                            "shop" : {
                                "id" : examplecartshopid,
                                "name" : shopexample.shopTitle
                            },
                            "item" : {
                                "name" : shopexample.items[1].name,
                                "amount" : 1,
                                "price" : shopexample.items[1].price
                            }
                        };
                        done();
                    } else {
                        console.log("Couldnt create cart user sample data");
                        console.log(error);
                        done();
                    }
                });
            } else {
                console.log("couldnt create cart shop sample data");
                console.log(error);
                done();
            }
        });
    });
    describe("openCart", function(){
        /*it("No data", function(done){
            cartjs.openCart(null, null, function(err, value){
                if(!err){
                    done(new Error("Unexpected Result."));
                } else {
                    done();
                }
            });
        });
        it("Session Parameter missing", function(done){
           cartjs.openCart(null, cartexample, function(err, value){
                if(!err){
                    done(new Error("Unexpected Result."));
                } else {
                    done();
                }
            }); 
        });
        it("Cart Parameter missing", function(done){
           cartjs.openCart(exampleuserid, null, function(err, value){
                if(!err){
                    done(new Error("Unexpected Result."));
                } else {
                    done();
                }
            }); 
        });*/
        it("Opening Cart successful", function(done){
            cartjs.openCart(examplecartprofileid, cartexample, function(value){
                currcart = value;
                console.log(currcart);
                done();
            });
        });
    });
    describe("addtoCart", function(done){
        /*it("No data", function(done){
            cartjs.addtoCart(null, null, function(err, value){
                if(!err){
                    done(new Error("Unexpected Result."));
                } else {
                    done();
                }
            });
        });
        it("Cart Parameter missing", function(done){
            cartjs.openCart(null, cartexample, function(err, value){
                if(!err){
                    done(new Error("Unexpected Result."));
                } else {
                    done();
                }
            });
        });
        it("Add Parameter missng", function(done){
            cartjs.openCart(cartexample, null, function(err, value){
                if(!err){
                    done(new Error("Unexpected Result."));
                } else {
                    done();
                }
            });
        });*/
        it("Adding existing item to cart successful", function(done){
            cartjs.addtoCart(currcart, cartexample, function(err, value){
                if(err){
                    done(err);
                } else {
                    currcart = value;
                    assert.equal(2, value.items[0].amount);
                    done();
                }
            }); 
        });
        it("Adding new item to cart successful", function(done){
            cartjs.addtoCart(currcart, addcartexample, function(err, value){
                if(err){
                    done(err);
                } else {
                    currcart = value;
                    assert.equal("Samplebread", value.items[1].name)
                    done();
                }
            });
        });
    });
    describe("removefromCart", function(){
        it("Removing from Cart successful", function(done){
            cartjs.removefromCart(currcart, addcartexample, function(err, value){    
                if(err){
                    done(err);
                } else {
                    currcart = value;
                    assert.equal(null, value.items[1]);
                    done();
                }
            });
        });
    });
    describe("placeOrder", function(){
        it("Placing order successful", function(done){
            cartjs.placeOrder(currcart, Date(), function(err, value){
                if(!err){
                    examplecartid = value._id;
                    examplecartrev = value._rev;
                    done();
                } else {
                    done(err);
                }
            })
        })
    })
    after(function(done){
        var document1 = shopdb.create({_id:examplecartshopid, _rev: examplecartshoprev});
        document1.delete(function(error) {
            if(!error){
                var document2 = userdb.create({_id:examplecartprofileid, _rev: examplecartprofilerev});
                document2.delete(function(error){
                    if(!error){
                        var document3 = orderdb.create({_id:examplecartid, _rev: examplecartrev});
                        document3.delete(function(error){
                            if (!error){
                                done();
                            } else {
                                console.log("Couldnt remove cart sample data");
                                console.log(error);
                                done(error);
                            }
                        });
                    } else {
                        console.log("Couldnt remove cart user sample data");
                        console.log(error);
                        done(error);
                    }
                });
            } else {
                console.log("couldnt remove cart shop sample data");
                console.log(error);
                done(error);
            }
        });
    });
});

//Order Controller -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
//Order Variables
var orderexample;
var exampleorderid;
var exampleorderrev;
var exampleordershopid;
var exampleordershoprev;
var exampleorderprofileid;
var exampleorderprofilerev;

describe("controller: order", function(){
    before(function(done){
        var document1 = shopdb.create(shopexample);
        document1.save(function(error) {
            if(!error){
                exampleordershopid = document1._id;
                exampleordershoprev = document1._rev;
                var document2 = userdb.create(userfinishedexample);
                document2.save(function(error){
                    if(!error){
                        exampleorderprofileid = document2._id;
                        exampleorderprofilerev = document2._rev;
                        //Cart Samples
                        orderexample = {
                            "timestamp" : Date(),
                            "type" : "order",
                            "fetchtime" : Date(),
                            "user" : {
                                "id" : exampleorderprofileid,
                                "name" : userexample.first_name+" "+userexample.last_name
                            },
                            "shop" : {
                                "id" : examplecartshopid,
                                "name" : shopexample.shopTitle
                            },
                            "items" : [{
                                "name" : shopexample.items[0].name,
                                "amount" : 1,
                                "price" : shopexample.items[0].price
                            }],
                            "status" : "ordered"
                        };
                        var document3 = orderdb.create(orderexample);
                        document3.save(function(error){
                            if(!error){
                                exampleorderid = document3._id;
                                exampleorderrev = document3._rev;
                                done()
                            } else {
                                console.log("Couldnt create order sample data");
                                console.log(error);        
                                done(error);
                            }
                        });
                    } else {
                        console.log("Couldnt create order user sample data");
                        console.log(error);
                        done();
                    }
                });
            } else {
                console.log("couldnt create order shop sample data");
                console.log(error);
                done();
            }
        });
    });
    describe("getAllforUser", function(){
        it("Retrieving all for user successful", function (done){
            orderjs.getAllforUser(exampleorderprofileid, done);
        });
    });
    describe("getPendingforUser", function(){
        it("Retrieving pending for user successful", function (done){
            orderjs.getPendingforUser(exampleorderprofileid, done);
        });
    });
    describe("getAllforShop", function(){
        it("Retrieving all for shop successful", function (done){
            orderjs.getAllforShop(exampleorderprofileid, done);
        });
    });
    describe("getPendingforShop", function(){
        it("Retrieving pending for shop successful", function (done){
            orderjs.getPendingforShop(exampleorderprofileid, done);
        });
    });
    after(function(done){
        var document1 = shopdb.create({_id:exampleordershopid, _rev: exampleordershoprev});
        document1.delete(function(error) {
            if(!error){
                var document2 = userdb.create({_id:exampleorderprofileid, _rev: exampleorderprofilerev});
                document2.delete(function(error){
                    if(!error){
                        var document3 = orderdb.create({_id:exampleorderid, _rev: exampleorderrev});
                        document3.delete(function(error){
                            if (!error){
                                done();
                            } else {
                                console.log("Couldnt remove order sample data");
                                console.log(error);
                                done(error);
                            }
                        });
                    } else {
                        console.log("Couldnt remove cart order sample data");
                        console.log(error);
                        done(error);
                    }
                });
            } else {
                console.log("couldnt remove order shop sample data");
                console.log(error);
                done(error);
            }
        });
    });
});