// models/EstimateDetail.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../services/sequelize');

// models/EstimateDetail.js
exports.EstimateDetail = sequelize.define('EstimateDetail', {
  estimateId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Estimates',
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
