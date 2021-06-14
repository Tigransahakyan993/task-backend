const express = require('express');
const productController = require("../controller/productController");
const products = express.Router();
const passport = require('passport');
const authGuard = require('node-auth-guard');
const initRoleField = authGuard.initialize({rolesField: 'role'});
const requireAuth = passport.authenticate('jwt', {session: false});

products.get('/',
    requireAuth,
    productController.getAllProducts
)

products.get('/:id',
    requireAuth,
    productController.getProduct
)

products.post('/',
    requireAuth,
    initRoleField,
    authGuard.roles('admin', 'owner'),
    productController.createProduct
)

products.put('/:id',
    requireAuth,
    initRoleField,
    authGuard.roles('admin', 'owner'),
    productController.updateProduct
)

products.delete('/:id',
    requireAuth,
    initRoleField,
    authGuard.roles('admin', 'owner'),
    productController.deleteProduct
)

module.exports = products;