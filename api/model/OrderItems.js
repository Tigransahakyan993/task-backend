const { Sequelize, Model } = require('sequelize');
const Order = require('./Order');
const {sequelize} = require('../connection/connection')

class OrderItems extends Model {}

OrderItems.init({
    name: {
      type: Sequelize.STRING
    },
    price: {
      type: Sequelize.INTEGER
    },
    count: {
      type: Sequelize.INTEGER
    },
    productId: {
      type: Sequelize.INTEGER
    },
  },
  {
    sequelize,
    modelName: 'orderItems'
  });

Order.hasMany(OrderItems, {as: 'orderItems'});
OrderItems.belongsTo(Order, {foreignKey: 'orderId', as: 'orderItems'});

module.exports = OrderItems;