'use strict';

let Sequelize = require('sequelize');

let db = require('../services/database');

// Define the User model
let UserModel = db.define('facebookUser', {
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    facebookId: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = UserModel;