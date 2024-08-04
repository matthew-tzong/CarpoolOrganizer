const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');

const Analytics = sequelize.define('Analytics', {
  totalCarpools: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  totalUsers: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  totalDistanceSaved: {
    type: DataTypes.FLOAT,
    defaultValue: 0.0,
  },
});

module.exports = Analytics;
