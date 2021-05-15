const BaseService = require('./BaseServise');
const Order = require('../model/Order');
const ProductService = require('./ProductService');
const OrderItems = require('../model/OrderItems');

class OrderService extends BaseService{
  constructor() {
    super(Order)
    this.productService = new ProductService();
  }

    getById(id) {
      return Order.findOne({include: {model: OrderItems, as: 'orderItems'}})
    }

    async getAll(params) {
      delete params.limit;
      params.include = {model: OrderItems, as: 'orderItems'}
      return super.getAll(params)
    }

  async create({orderItems, restaurantId, price, status, userId}) {
    const {orderItemsIds, orderItemsMap} = orderItems.reduce((prev, next) => {
      prev.orderItemsIds.push(next.productId);
      prev.orderItemsMap[next.productId] = next;
        return prev;
    }, {orderItemsIds : [], orderItemsMap: {}});
    const restaurantItems = await this.productService.getAll({where: {id: orderItemsIds}});

    if (restaurantItems.rows.length !== orderItemsIds.length) {
      throw new Error('some ids are invalid');
    }
    for (let i = 0; i < restaurantItems.rows.length ; i++) {
      if (restaurantItems.rows[0].restaurantId !== restaurantItems.rows[i].restaurantId) {
        throw 'some ids are invalid'
      }
    }

    const totalPrice = restaurantItems.rows.reduce((prev, next) => {
      prev += (next.price * orderItemsMap[next.id].count);
      orderItemsMap[next.id].price = next.price;
      return prev;
    }, 0)
    const newOrder = await super.create({restaurantId, price: totalPrice, status, userId});
    orderItems.forEach(item => {
      item.orderId = newOrder.id;
      item.price = orderItemsMap[item.productId].price;
    });
    const newOrderItems = await OrderItems.bulkCreate(orderItems);
    return {...newOrder.dataValues, orderItems: [...newOrderItems]};
  }
}

module.exports = OrderService;