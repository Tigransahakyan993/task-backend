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
      params.include = {model: OrderItems, as: 'orderItems'}
      return super.getAll(params)
    }

  async create({orderItems, restaurantId, price, status, userId}) {
    const orderItemsIds = orderItems.map(item => item.productId);
    const restaurantItems = await this.productService.getAll({where: {id: orderItemsIds}});
    if (restaurantItems.rows.length !== orderItemsIds.length) {
      throw new Error('some ids are invalid');
    }
    const newOrder = await super.create({restaurantId, price: 150, status, userId});
    orderItems.forEach(item => {
      item.orderId = newOrder.id;
    });
    const newOrderItems = await OrderItems.bulkCreate(orderItems);
    return {...newOrder.dataValues, orderItems: [...newOrderItems]};
  }
}

module.exports = OrderService;