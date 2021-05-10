const BaseService = require('./BaseServise')
const Product = require('../model/Product')

class ProductService extends BaseService{
  constructor() {
    super(Product)
  }

  update(args) {
    const {value, options} = args;
    console.log('value', value);
    console.log('options', options);
    return super.update(value, options);
  }
}

module.exports = ProductService;