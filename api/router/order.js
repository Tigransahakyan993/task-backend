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
    authGuard.roles('admin', 'owner', 'buyer'),
    ordersController.getAllOrders
)

orders.get('/:id',
    requireAuth,
    initFields,
    authGuard.roles('admin', 'owner', 'buyer'),
    ordersController.getOrder
)

orders.post('/',
    requireAuth,
    initFields,
    authGuard.roles('admin', 'buyer'),
    ordersController.createOrder
)

orders.post('/changeOrderStatus',
    requireAuth,
    initFields,
    authGuard.roles('admin', 'owner', 'buyer'),
    ordersController.changeOrderStatus
)

module.exports = orders;