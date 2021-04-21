const { Sequelize, Model } = require('sequelize');
const {sequelize} = require('../connection/connection')
const User = require('../model/User')

class Restaurant extends Model {}

Restaurant.init({
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING
  }
},
  {
  sequelize,
  modelName: 'restaurant'
});

User.hasMany(Restaurant, {as: 'restaurants'})
Restaurant.belongsTo(User, {foreignKey: 'userId', as: 'users'})

module.exports = Restaurant;