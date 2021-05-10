const express = require('express');
const passport = require('passport');
const authGuard = require('node-auth-guard');
const orders = express.Router();
const ordersController = require("../controller/orderController");
const requireAuth = passport.authenticate('jwt', {session: false});
const initFields = authGuard.initialize({rolesField: 'role'});

orders.get('/',
    requireAuth,
    initFields,
    authGuard.roles('admin', 'buyer'),
    ordersController.getAllOrders
)

orders.get('/:id',
    requireAuth,
    initFields,
    authGuard.roles('admin', 'buyer'),
    ordersController.getOrder
)

orders.post('/',
    requireAuth,
    initFields,
    authGuard.roles('admin', 'buyer'),
    ordersController.createOrder
)

orders.put('/:id',
    requireAuth,
    initFields,
    authGuard.roles('admin', 'buyer'),
    ordersController.updateOrder
)

orders.delete('/:id',
    requireAuth,
    initFields,
    authGuard.roles('admin', 'buyer'),
    ordersController.deleteOrder
)

module.exports = orders;