const BaseService = require('./BaseServise')
const Product = require('../model/Product')

class ProductService extends BaseService{
  constructor() {
    super(Product)
  }
}

module.exports = ProductService;