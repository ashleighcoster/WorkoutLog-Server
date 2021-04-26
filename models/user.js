const sequelize = require('sequelize'); 
const database = require('../db');

const User = database.define('user', {
    username: {
        type: sequelize.STRING, 
        allowNull: false, 
        unique: true
    },
    passwordhash: {
        type: sequelize.STRING, 
        allowNull: false
    },
});

module.exports = User; 