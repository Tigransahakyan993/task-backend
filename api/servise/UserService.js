const BaseService = require('./BaseServise')
const User = require('../model/User')
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
        return super.create({...options, password: hashPassword})
      } catch (e) {
        console.log(e);
      }
  }

  async getById(id) {
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }
}

module.exports = UserService;