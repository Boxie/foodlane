/**
 * Created by Lukas on 28.04.17.
 */

var pug = require('pug');

module.exports = function(router) {
    'use strict';
    // This will handle the url calls for /users/:user_id
    router.route('/:userId')
        .get(function(req, res, next) {
            // Return user
        })
        .put(function(req, res, next) {
            // Update user
        })
        .patch(function(req, res,next) {
            // Patch
        })
        .delete(function(req, res, next) {
            // Delete record
        });

    router.route('/')
        .get(function(req, res, next) {

        }).post(function(req, res, next) {
    });
};