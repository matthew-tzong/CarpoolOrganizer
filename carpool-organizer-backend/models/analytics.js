// Import DataTypes and import sequelize instance
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Carpool = require('./Carpool'); // Ensure this path is correct

// Define Analytics model from DB
const Analytics = sequelize.define('Analytics', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  average_commute_time: {
    type: DataTypes.DOUBLE,
    defaultValue: 0.0,
  },
  total_cost_savings: {
    type: DataTypes.DOUBLE,
    defaultValue: 0.0,
  },
  total_carbon_reduction: {
    type: DataTypes.DOUBLE,
    defaultValue: 0.0,
  },
  carpoolId: { 
    type: DataTypes.INTEGER,
    references: {
      model: Carpool,
      key: 'id',
    },
    allowNull: false,
  },
});

module.exports = Analytics;

// Define associations
Carpool.hasOne(Analytics, { foreignKey: 'carpoolId' });
Analytics.belongsTo(Carpool, { foreignKey: 'carpoolId' });
