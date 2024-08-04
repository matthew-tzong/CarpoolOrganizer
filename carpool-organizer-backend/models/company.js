const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');

const Company = sequelize.define('Company', {
  code: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Company;
