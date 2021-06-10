const {orderStatus} = require("../../config");
const {userRole} = require("../../config");
const BaseService = require('./BaseServise');
const Order = require('../model/Order');
const ProductService = require('./ProductService');
const OrderItems = require('../model/OrderItems');

class OrderService extends BaseService{
  constructor() {
    super(Order)
    this.productService = new ProductService();
  }

    async getById(id) {
      return await Order.findByPk(+id,{include: {model: OrderItems, as: 'orderItems'}});
    }

    async getBy(params) {
    const options = {
      where: params.where,
      include: [
        {
          model: OrderItems, as: 'orderItems',
          limit: params.limit,
          offset: params.offset
        }
    ]
    }
      const order =  await Order.findOne(options);
      const count = await order.countOrderItems();
      return {...order.dataValues, count};
    }

    getAllWitItems(params) {
      params.include = {model: OrderItems, as: 'orderItems'}
      return super.getAll(params)
    }

  async create({orderItems, restaurantId, price, status, userId}) {

    const {orderItemsIds, orderItemsMap} = orderItems.reduce((prev, next) => {
      prev.orderItemsIds.push(next.productId);
      prev.orderItemsMap[next.productId] = next;
        return prev;
    }, {orderItemsIds : [], orderItemsMap: {}});

    const products = await this.productService.getAll({where: {id: orderItemsIds}});

    if (products.rows.length !== orderItemsIds.length) {
      throw new Error('Some ids are invalid');
    }
    for (let i = 0; i < products.rows.length ; i++) {
      if (products.rows[0].restaurantId !== products.rows[i].restaurantId) {
        throw 'some ids are invalid'
      }
    }

    const totalPrice = products.rows.reduce((prev, next) => {
      prev += (next.price * orderItemsMap[next.id].count);
      orderItemsMap[next.id].price = next.price;
      orderItemsMap[next.id].name = next.name;
      return prev;
    }, 0);

    const newOrder = await super.create({restaurantId, price: totalPrice, status, userId});

    orderItems.forEach(item => {
      item.orderId = newOrder.id;
      item.price = orderItemsMap[item.productId].price;
      item.name = orderItemsMap[item.productId].name;
    });
    const newOrderItems = await OrderItems.bulkCreate(orderItems);
    return {...newOrder.dataValues, orderItems: [...newOrderItems]};
  }

  async update({values, options}) {
    const {id} = values;
    const {user} = options;
    const orderOptions = {where: {id}}
    const order = await super.getById(id);

    if (user.role[0] === userRole.buyer) {
      if (order.userId === user.id) {
        if (order.status === orderStatus.placed) {
          const data = {
            status: orderStatus.canceled
          }
          return await super.update({values: data, options: orderOptions})
        }
        if (order.status === orderStatus.delivered) {
          const data = {
            status: orderStatus.received
          }
          return await super.update({values: data, options: orderOptions})
        }
        throw new Error('Order already canceled');
      }
      throw new Error('Permission denied');
    }

    if (order.restaurantId !== user.restaurants[0].id) {
      throw new Error('Permission denied');
    }

    switch (order.status) {
      case orderStatus.canceled:
        return {message: 'Order already canceled'}
      case orderStatus.placed:
        return await super.update({values: {status: orderStatus.processing}, options: orderOptions})
      case orderStatus.processing:
        return await super.update({values: {status: orderStatus.inRoute}, options: orderOptions})
      case orderStatus.inRoute:
        return await super.update({values: {status: orderStatus.delivered}, options: orderOptions})
      default:
        return {}
    }
  }
}

module.exports = OrderService;