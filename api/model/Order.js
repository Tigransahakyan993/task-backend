const { Sequelize, Model } = require('sequelize');
const {sequelize} = require('../connection/connection')
const User = require('../model/User')
const Restaurant = require('../model/Restaurant')

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

User.hasMany(Order, {as : 'orders'});
Order.belongsTo(User, {foreignKey: 'userId' ,as : 'users'});

Restaurant.hasMany(Order, {as : 'orders'});
Order.belongsTo(Restaurant, {foreignKey: 'restaurantId' ,as : 'restaurants'});