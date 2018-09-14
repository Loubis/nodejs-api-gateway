'use strict';

const router = require('express').Router();

const AuthController = require('../controllers/authController');

let AuthRoutes = function (passport) {

    // Auth routes
    // Auth routes for local authentication
    router.post('/local/signup', AuthController.signUp);
    router.post('/local/login', AuthController.login);

    // Auth routes foor Google authentication
    router.get('/google', passport.authenticate('google', { session: false, scope: ['openid', 'profile', 'email'] }));
    router.get('/google/callback', passport.authenticate('google', { session: false }), AuthController.googleAuth);

    // Auth routes for Facebook authentication 
    router.get('/fb', passport.authenticate('facebook', { session: false, scope: ['public_profile', 'email'] }));
    router.get('/fb/callback', passport.authenticate('facebook', { session: false }), AuthController.facebookAuth);

    return router;
};

module.exports = AuthRoutes;