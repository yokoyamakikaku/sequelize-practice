// models/User.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../services/sequelize');

exports.User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  birthday: {
    type: DataTypes.DATE
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  deletedAt: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  paranoid: true
});
