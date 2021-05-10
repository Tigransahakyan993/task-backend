const OrderService = require('../servise/OrderService');
const RestaurantService = require('../servise/RestaurantService');
const paramsConverter = require('../dto_converter/paramsConverter');
const service = new OrderService();
const restaurantService = new RestaurantService();
const serviceDecorator = require('../dto_converter/service-decorator');
const converter = require('../dto_converter/orderConverter');
const {userRole} = require('../../config')
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

    const orders = await serviceDecorator.getAll(service, converter, params);
    writeStatus(res, 200, orders)
  } catch (e) {
    console.log('Error : ',e)
    writeStatus(res, 401, {message: 'Something want wrong'})
  }
}

exports.getOrder = async (req, res) => {
  const id = req.id;

  try {
    const orders = await serviceDecorator.getById(
      service,
      converter,
      id
    );
    writeStatus(res, 200, orders)
  } catch (e) {
    console.log(e)
    writeStatus(res, 401, {message: 'Something want wrong'})
  }
}

exports.createOrder = async (req, res) => {
  const data = req.body;

  try{
    const order = await serviceDecorator.create(service, converter, data);
    if (!order) {
      writeStatus(res, 403, {status: 403, message: 'something went wrong'});
      return
    }
    writeStatus(res, 200, order);
  } catch (e) {
    console.log(e);
  }
}

exports.updateOrder = async () => {

}

exports.deleteOrder = async (req, res) => {

}