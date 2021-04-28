const { Sequelize, Model } = require('sequelize');
const {sequelize} = require('../connection/connection')

class User extends Model {}

User.init({
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
    password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  first_name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  last_name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  role: {
    type: Sequelize.ENUM('buyer', 'owner', 'admin')
  }
},
  {
    sequelize,
    modelName: 'user'
  })

module.exports = User;