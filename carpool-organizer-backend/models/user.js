//Import Datatypes and import sequelize instance
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

//Define User model from DB
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  location: {
    type: DataTypes.STRING,
  },
  availability: {
    type: DataTypes.STRING,
  },
  number: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, 
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  companyId: {
    type: DataTypes.INTEGER,
  } }, {
    tableName: 'User',
    timestamps: false
 }
);

module.exports = User;
