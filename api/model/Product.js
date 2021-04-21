const { Sequelize, Model } = require('sequelize');
const {sequelize} = require('../connection/connection')
const Restaurant = require('./Restaurant')

class Product extends Model {}

Product.init({
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    description: {
      type: Sequelize.STRING
    },
    price: {
      type: Sequelize.INTEGER
    }
  },
  {
    sequelize,
    modelName: 'products'
  });

Restaurant.hasMany(Product, {as: 'products'})
Product.belongsTo(Restaurant, {foreignKey: 'restaurantId', as: 'products'})

module.exports = Product;