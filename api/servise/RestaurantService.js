const BaseService = require('./BaseServise');
const Restaurant = require('../model/Restaurant');
const Product = require('../model/Product');
const { Op } = require("sequelize");

class RestaurantService extends BaseService{
  constructor() {
    super(Restaurant)
  }

  async getAll({ limit, offset, name }) {
    const options = {limit, offset};

    options.include = [{model: Product, as: 'products', limit: 7}];

    if (name) {
      options.where = {name: {[Op.like]: `%${name}%`}};
    }
    return super.getAll(options);
  }
}

module.exports = RestaurantService;