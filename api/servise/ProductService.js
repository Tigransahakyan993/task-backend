const BaseService = require('./BaseServise')
const Product = require('../model/Product')

class ProductService extends BaseService{
  constructor() {
    super(Product)
  }

  update(args) {
    const {values, options} = args;
    return super.update({values, options});
  }
}

module.exports = ProductService;