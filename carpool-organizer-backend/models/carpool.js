//Import Datatypes and import sequelize instance
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

//Define Carpool model from DB
const Carpool = sequelize.define('Carpool', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  origin: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  destination: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  time: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  userIds: {
    type: DataTypes.JSON,
    allowNull: false,
  },
});

module.exports = Carpool;
