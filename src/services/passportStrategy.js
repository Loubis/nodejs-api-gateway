'use strict';

let JWTStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt,
    FacebookStrategy = require('passport-facebook').Strategy,
    GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

let UserLocal = require('./../models/userLocal'),
    UserGoogle = require('./../models/userGoogle'),
    UserFacebook = require('./../models/userFacebook'),
    config = require('./../config');

// Hooks the JWT Strategy.
function hookStrategies(passport) {
    let options = {};

    options.secretOrKey = config.keys.secret
    options.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
    options.ignoreExpiration = false;

    passport.use(new JWTStrategy(options, (JWTPayload, done) => {

        if (JWTPayload.authType === 'local') {
            UserLocal.findOne({ where: { email: JWTPayload.email } }).then((user, err) => {
                if (err) return done(err, false);
                if (!user) return done(null, false);
                return done(null, user);
            });
        } else if (JWTPayload.authType === 'google') {
            UserGoogle.findOne({ where: { email: JWTPayload.email } }).then((user, err) => {
                if (err) return done(err, false);
                if (!user) return done(null, false);
                return done(null, user);
            });
        } else if (JWTPayload.authType === 'facebook') {
            UserFacebook.findOne({ where: { email: JWTPayload.email } }).then((user, err) => {
                if (err) return done(err, false);
                if (!user) return done(null, false);
                return done(null, user);
            });
        }
    }));
/*
    passport.use(new GoogleStrategy({
        clientID: config.ps.google.clientID,
        clientSecret: config.ps.google.clientSecret,
        callbackURL: config.server.url + "/auth/google/callback"
    }, (accessToken, refreshToken, profile, done) => {
        UserGoogle.findOrCreate({
            defaults: { email: profile.emails[0].value },
            where: { googleId: profile.id }
        }).then((user, err) => { return done(err, user[0]) });
    }
    ));

    passport.use(new FacebookStrategy({
        clientID: config.ps.facebook.clientID,
        clientSecret: config.ps.facebook.clientSecret,
        callbackURL: config.server.url + "/auth/fb/callback",
        profileFields: ['id', 'displayName', 'emails']
    }, (accessToken, refreshToken, profile, done) => {
        console.log(profile);
        UserFacebook.findOrCreate({
            defaults: { email: profile.emails[0].value },
            where: { facebookId: profile.id }
        }).then((user, err) => { return done(err, user[0]) });
    }
    ));
    */
}

module.exports = hookStrategies;