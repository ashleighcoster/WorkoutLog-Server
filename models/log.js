const { DataTypes } = require('sequelize');
const database = require('../db');

module.exports = database.define('log', {
    description: {
        type: DataTypes.STRING, 
        allowNull: false
    }, 
    definition: {
        type: DataTypes.STRING, 
        allowNull: false
    }, 
    result: {
        type: DataTypes.STRING, 
        allowNull: false
    }, 
    owner_id: DataTypes.INTEGER
    
})