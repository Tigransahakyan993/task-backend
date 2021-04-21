const express = require('express');
const productController = require("../controller/productController");
const products = express.Router();
const passport = require('passport');
// const requireAuth = passport.authenticate('jwt', {session: false});

products.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
})

products.get('/',
  productController.getAllProducts
)

products.get('/:id',
  productController.getProduct
)

products.post('/',
  productController.createProduct
)

products.put('/:id',
  productController.updateProduct
)

products.delete('/:id',
  productController.deleteProduct
)

module.exports = products;