const { Sequelize, Model } = require('sequelize');
const {sequelize} = require('../connection/connection')
const User = require('../model/User')

class Order extends Model {}

Order.init({
    price: {
      type: Sequelize.INTEGER
    },
    status: {
      type: Sequelize.STRING
    },
    restaurantId: {
      type: Sequelize.INTEGER
    },
  },
  {
    sequelize,
    modelName: 'order'
  });


module.exports = Order;

User.hasMany(Order, {as : 'order'});
Order.belongsTo(User, {foreignKey: 'userId' ,as : 'users'});