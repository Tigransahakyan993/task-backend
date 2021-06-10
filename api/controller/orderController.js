const OrderService = require('../servise/OrderService');
const RestaurantService = require('../servise/RestaurantService');
const paramsConverter = require('../dto_converter/paramsConverter');
const service = new OrderService();
const restaurantService = new RestaurantService();
const serviceDecorator = require('../dto_converter/service-decorator');
const converter = require('../dto_converter/orderConverter');
const {userRole} = require('../../config');
const {writeStatus} = require("../../utils");

exports.getAllOrders = async (req, res) => {
  const params = paramsConverter.toDto(req.query);
  const user = req.user;
  try {
    if (user.role.includes(userRole.buyer)) {
      params.where = {userId: user.id}
    }
    if (user.role.includes(userRole.owner)) {
      const ownerRestaurant = await restaurantService.getBy({where: {userId: user.id}});
      params.where = {restaurantId: ownerRestaurant.id}
    }

    const data = await serviceDecorator.getAll(service, converter, params);
    writeStatus(res, false, {...data})
  } catch (e) {
    writeStatus(res, true, {status: 400, message: e.message})
  }
}

exports.getOrder = async (req, res) => {
  const user = req.user;
  const params = paramsConverter.toDto(req.query);
  params.where = {id: +req.params.id};
  console.log(params);
  try {
    const order = await serviceDecorator.getBy(
      service,
      converter,
      params
    );
    if (user.role.includes(userRole.buyer)) {
      if (+user.id !== +order.userId) {
        return writeStatus(res, true, {message: 'Permission denied'})
      }
    }
    if (user.role.includes(userRole.owner)) {
      if (+user.restaurants[0].id !== +order.restaurantId) {
        return writeStatus(res, false, {message: 'Permission denied'})
      }
    }
    writeStatus(res, false, {orders: order})
  } catch (e) {
    console.log(e)
    writeStatus(res, true, {status: 400, message: 'Something want wrong'})
  }
}

exports.createOrder = async (req, res) => {
  const data = req.body;
  data.userId = req.user.id;

  try{
    const order = await serviceDecorator.create(service, converter, data);
    writeStatus(res, false, {data: order});
  } catch (err) {
    writeStatus(res, true, {status: 400, message: 'Something want wrong'});
  }
}

exports.changeOrderStatus = async (req, res) => {
  const {id} = req.body;
  const user = req.user;
  const options = {
      user
  };

  try {
    const changed = await serviceDecorator.update(service, converter, {data: {id}, options});
    if (changed) {
     return writeStatus(res, false, {message: 'Status updated successful'});
    }
    writeStatus(res, false, {message: "You can't update order status"})
  } catch (e) {
    console.log('ERROR:::',e);
    writeStatus(res, true, {status: 400, message: e.message});
  }
}