const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');

const Carpool = sequelize.define('Carpool', {
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
