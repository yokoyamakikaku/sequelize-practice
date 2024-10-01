// models/OrderDetail.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../services/sequelize');

// models/OrderDetail.js
exports.OrderDetail = sequelize.define('OrderDetail', {
  orderId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Orders',
      key: 'id'
    },
    primaryKey: true
  },
  detailNumber: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  productId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Products',
      key: 'id'
    }
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  estimateId: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  estimateDetailNumber: {
    type: DataTypes.INTEGER,
    allowNull: true
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
