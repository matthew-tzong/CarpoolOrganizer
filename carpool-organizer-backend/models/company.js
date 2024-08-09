//Define User model from DB
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

//Define Company model from DB
const Company = sequelize.define('Company', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  code: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  }, }, {
     tableName: 'Company',
     timestamps: false
  }
);

module.exports = Company;
