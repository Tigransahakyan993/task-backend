const express = require('express');
const orderController = require("../controller/orderController");
const order = express.Router();

order.get('/',
  orderController.getAllOrders,
)

order.get('/:id',
  orderController.getOrder
)

order.post('/',
  orderController.createOrder
)

module.exports = order;