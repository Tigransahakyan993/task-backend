const BaseService = require('./BaseServise')
const Product = require('../model/Product')

class ProductService extends BaseService{
  constructor() {
    super(Product)
  }

  update(args) {
    const {data, options} = args;
    return super.update(data, options);
  }
}

module.exports = ProductService;