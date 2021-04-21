const RestaurantsService = require('../servise/RestaurantService');
const service = new RestaurantsService();
const converter = require('../dto_converter/restaurantConverter');
const paramsConverter = require('../dto_converter/paramsConverter');
const serviceDecorator = require('../dto_converter/service-decorator');
const { writeStatus } = require('../../utils');

exports.getAllRestaurants = async (req, res) => {
  const params = paramsConverter.toDto(req.query);

  try {
    const data = await serviceDecorator.getAll(
      service,
      converter,
      params
    );
    const restaurants = data.filter(restaurant => restaurant.products.length)
    writeStatus(res, 200, restaurants)
  } catch (e) {
    writeStatus(res, 401, {message: 'Something want wrong'})
  }
}

exports.getRestaurant = async (req, res) => {
  const id = req.id;

  try {
    const restaurant = await serviceDecorator.getById(service, converter, id);
    writeStatus(res, 200, restaurant)
  }
  catch (e) {
    console.log(e);
    writeStatus(res, 401, {message: 'Something want wrong'})
  }
}

exports.createRestaurant = async (req, res) => {
  const data = req.body;
  data.userId = 1;
  try {
    const restaurant = await serviceDecorator.create(service, converter, data);
    writeStatus(res, 200, restaurant)
  }catch (e) {
    console.log(e);
    writeStatus(res, 401, {message: 'Something want wrong'})
  }
}

exports.updateRestaurant = async (req, res) => {
  const data = req.body;
  const { id } = req.params;

  try {
    const restaurant = await serviceDecorator.update(service, converter, {...data, id});
    writeStatus(res, 200, restaurant)
  }catch (e) {
    console.log(e);
    writeStatus(res, 401, {message: 'Something want wrong'})
  }
}

exports.deleteRestaurant = async (req, res) => {
  const id = req.id;
  try {
    const restaurant = await serviceDecorator.delete(service, converter, id);
    writeStatus(res, 200, restaurant)
  }
  catch (e) {
    console.log(e);
    writeStatus(res, 401, {message: 'Something want wrong'})
  }
}