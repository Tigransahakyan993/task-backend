const BaseService = require('./BaseServise')
const User = require('../model/User')
const jwt = require('jsonwebtoken')
const config = require('../../config')
const bcrypt = require('bcrypt');


class UserService extends BaseService{
  constructor() {
    super(User)
  }

  async create(options) {
      const {email, password} = options;
      const user = await User.findOne({where: {email: email}});
      if (user) {
        throw new Error('User such exist');
      }
      try {
        const hashPassword = await bcrypt.hash(password, config.salt.saltRounds);
        console.log('hashPassword',hashPassword);
        return super.create({...options, password: hashPassword})
      } catch (e) {
        console.log(e);
      }
  }
}

module.exports = UserService;