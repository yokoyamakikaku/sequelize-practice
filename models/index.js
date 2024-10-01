require('./associations')

const { User } = require('./User');
const { Estimate } = require('./Estimate')
const { EstimateDetail } = require('./EstimateDetail')
const { Order } = require('./Order')
const { OrderDetail } = require('./OrderDetail')
const { Product } = require('./Product')

module.exports = {
  User,
  Estimate,
  EstimateDetail,
  Order,
  OrderDetail,
  Product,
}
