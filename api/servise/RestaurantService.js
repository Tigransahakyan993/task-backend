const BaseService = require('./BaseServise')
const Restaurant = require('../model/Restaurant')
const Product = require('../model/Product');

class RestaurantService extends BaseService{
  constructor() {
    super(Restaurant)
  }

  async getAll(params) {
    params.include = [{model: Product, as: 'products', limit: 7}];
    return super.getAll(params);
  }

  update(data) {
    const options = {};
    options.where = {id: data.id}
    return super.update(data, options)
  }

}

module.exports = RestaurantService;