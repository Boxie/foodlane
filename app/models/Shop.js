/**
 * Created by Lukas on 21.04.17.
 */
/**
 * Created by Lukas on 30.04.17.
 */
var dbHandle = require("../helpers/database");
var couchDBModel = require('../middleware/couchdb-model');
var extend = require('extend');

var Shop = couchDBModel(dbHandle, {
    views: [
        '_design/users/_view/by_credentials',
        '_design/users/_view/by_username',
        '_design/users/_view/by_email'
    ],
    constraints: {
        username: {
            presence: true,
            exclusion: {
                within: ["nicklas"],
                message: "'%{value}' is not allowed"
            }
        },
        password: {
            presence: true,
            length: {
                minimum: 6,
                message: "must be at least 6 characters"
            }
        }
    }
});

// called if created or find
User.instanceConstructor = function (model, data) {
    couchDBModel.Instance.call(this, model, data);
    // Instance constructor already applied all field in 'data' to 'this'.
    this.type = "user";
};

// function on use
extend(User.instanceConstructor.prototype, couchDBModel.Instance.prototype, {
    checkPassword: function(password) {
        return this.password === password;
    }
});

module.exports = User;