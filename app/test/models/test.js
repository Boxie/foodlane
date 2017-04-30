/**
 * Created by Lukas on 29.04.17.
 */
var assert = require('assert');
describe('Models', function() {
    describe('User', function() {
        var User = require("../../models/users");
        describe('#getUserByID()', function () {
            it('get User by doc_id', function(done) {
                User.getUserByID("b3fedbec46b37fb4fbc4ce474f000419",done);
            });
        }) // end #getUserByID
    }); // end User
}); // end Model

