const OrderService = require('../servise/OrderService');
const OrderItems = require('../model/OrderItems');
const service = new OrderService();
const serviceDecorator = require('../dto_converter/service-decorator');
const converter = require('../dto_converter/orderConverter');
const {writeStatus} = require("../../utils");

exports.getAllOrders = async (req, res) => {
  const params = req.query;

  try {
    const orders = await serviceDecorator.getAll(service, converter, params);
    writeStatus(res, 200, orders)
  } catch (e) {
    console.log(e)
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
    writeStatus(res, 200, {status: 200, data: order});
  } catch (e) {
    console.log(e);
  }

}

exports.updateRestaurant = async () => {

}

exports.changeOrderStatus = async (req, res) => {

}