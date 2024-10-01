const { User } = require('./User');
const { Product } = require('./Product');
const { Estimate } = require('./Estimate');
const { EstimateDetail } = require('./EstimateDetail');
const { Order } = require('./Order');
const { OrderDetail } = require('./OrderDetail');

User.hasMany(Estimate, { foreignKey: 'userId' });
Estimate.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User, { foreignKey: 'userId' });

Estimate.hasMany(EstimateDetail, { foreignKey: 'estimateId' });
EstimateDetail.belongsTo(Estimate, { foreignKey: 'estimateId' });

Order.hasMany(OrderDetail, { foreignKey: 'orderId' });
OrderDetail.belongsTo(Order, { foreignKey: 'orderId' });

OrderDetail.belongsTo(EstimateDetail, { foreignKey: 'estimateId', targetKey: 'estimateId' });
OrderDetail.belongsTo(EstimateDetail, { foreignKey: 'estimateDetailNumber', targetKey: 'detailNumber' });

Product.hasMany(EstimateDetail, { foreignKey: 'productId' });
EstimateDetail.belongsTo(Product, { foreignKey: 'productId' });

Product.hasMany(OrderDetail, { foreignKey: 'productId' });
OrderDetail.belongsTo(Product, { foreignKey: 'productId' });
