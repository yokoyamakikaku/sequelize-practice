// models/Order.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../services/sequelize');

exports.Order = sequelize.define('Order', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  status: {
    type: DataTypes.ENUM('pending', 'rejected', 'confirmed'),
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Users',
      key: 'id'
    }
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
