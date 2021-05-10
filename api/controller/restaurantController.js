const RestaurantsService = require('../servise/RestaurantService');
const service = new RestaurantsService();
const converter = require('../dto_converter/restaurantConverter');
const paramsConverter = require('../dto_converter/paramsConverter');
const serviceDecorator = require('../dto_converter/service-decorator');
const { writeStatus } = require('../../utils');
const {userRole} = require('../../config')

exports.getAllRestaurants = async (req, res) => {
  const params = paramsConverter.toDto(req.query);

  try {
    const data = await serviceDecorator.getAll(
      service,
      converter,
      params
    );
    // TODO: don't forget change writeStatus( *data* -> *restaurants* )
    const restaurants = data.filter(restaurant => restaurant.products.length)
    writeStatus(res, 200, data)
  } catch (e) {
    writeStatus(res, 401, {message: 'Something want wrong'})
  }
}

exports.getRestaurant = async (req, res) => {
  const id = req.params.id;

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
  const user = req.user;
  const userId = req.user.id;

  try {
    if (user.role.includes(userRole.owner)) {
      const userRestaurant = await service.getBy({where: {userId}});

      if (userRestaurant) {
        return writeStatus(res, 200, {message: 'Restaurant such exist'})
      }
      const restaurant = await serviceDecorator.create(service, converter, {...data, userId});
      return writeStatus(res, 200, restaurant)
    }

    const restaurant = await serviceDecorator.create(service, converter, data);
    writeStatus(res, 200, restaurant)
  }catch (e) {
    console.log(e);
    writeStatus(res, 401, {message: 'Something want wrong'})
  }
}

exports.updateRestaurant = async (req, res) => {
  const user = req.user;
  const data = req.body;
  const options = {}

  try {
    if (user.role.includes(userRole.owner)) {
      options.where = {userId: req.user.id}
      const userRestaurant = await service.getBy(options);
      if (!userRestaurant) {
        return writeStatus(res, 400, {message: 'Bad request'})
      }
      const restaurant = await serviceDecorator.update(service, converter, {data, options});
      return writeStatus(res, 200, restaurant)
    }

    options.where = {id: data.restaurantId}
    const restaurant = await serviceDecorator.update(service, converter, {data, options});
    writeStatus(res, 200, restaurant)
  }catch (e) {
    console.log(e);
    writeStatus(res, 401, {message: 'Something want wrong'})
  }
}

exports.deleteRestaurant = async (req, res) => {
  const id = req.params.id;
  const user = req.user;

  try {

    if (user.role.includes(userRole.owner)) {
      const userRestaurant = await service.getBy({where: {userId: req.user.id}});

      if (!userRestaurant) {
        return writeStatus(res, 401, {message: "You have not Restaurants"})
      }

      if (+userRestaurant.id !== +id) {
        return writeStatus(res, 401, {message: "You can't change other's Restaurants"})
      }

      const restaurant = await serviceDecorator.delete(service, id);
      return writeStatus(res, 200, restaurant)
    }

    const restaurant = await serviceDecorator.delete(service, id);
    if (restaurant) {
     return writeStatus(res, 200, {message: 'Restaurants deleted successful'})
    }
    writeStatus(res, 200, {message: 'Can not delete Restaurant'})
  }
  catch (e) {
    console.log(e);
    writeStatus(res, 401, {message: 'Something want wrong'})
  }
}