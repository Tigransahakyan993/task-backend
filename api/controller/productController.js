const ProductService = require('../servise/ProductService');
const RestaurantService = require('../servise/RestaurantService');
const service = new ProductService();
const restaurantService = new RestaurantService();
const converter = require('../dto_converter/productConverter');
const restaurantConverter = require('../dto_converter/restaurantConverter');
const paramsConverter = require('../dto_converter/paramsConverter');
const serviceDecorator = require('../dto_converter/service-decorator');
const { writeStatus } = require('../../utils');
const {userRole} = require('../../config');

exports.getAllProducts = async (req, res) => {
  const {restaurantId} = req.query;
  const params = paramsConverter.toDto(req.query)
  if (+restaurantId) {
    params.where = {restaurantId: +restaurantId}
  }

  try {
    const products = await serviceDecorator.getAll(
      service,
      converter,
      params
    );
    writeStatus(res, false, products)
  } catch (e) {
    console.log(e)
    writeStatus(res, true, {message: 'Something want wrong'})
  }
}

exports.getProduct = async (req, res) => {
  const {id} = req.params;

  try {
    const product = await serviceDecorator.getById(service, converter, id);
    writeStatus(res, false, product)
  }
  catch (e) {
    console.log(e);
    writeStatus(res, true, {message: 'Something want wrong'})
  }
}

exports.createProduct = async (req, res) => {
  const user = req.user;
  const data = req.body;

  try {
    if (user.role.includes(userRole.owner)) {
      const params = {where: {userId: user.id}};
      const userRestaurant = await serviceDecorator.getBy(restaurantService, restaurantConverter, params);
      if (!userRestaurant) {
          return writeStatus(res, true, {message: 'You have not restaurant'})
        }
      data.restaurantId = +userRestaurant.id;
    }

      const product = await serviceDecorator.create(service, converter, data);
      writeStatus(res, false, product)
  }catch (e) {
    console.log(e);
    writeStatus(res, true, {message: 'Something want wrong'})
  }
}

exports.updateProduct = async (req, res) => {
  const user = req.user;
  const data = req.body;
  const options = {where: {id: req.params.id}};
  const id = req.params.id;

  try {
    if (user.role.includes(userRole.owner)) {
      const params = {where: {userId: user.id}};
      const userRestaurant = await serviceDecorator.getBy(restaurantService, restaurantConverter, params);
      const product = await service.getById(id)

      if (+userRestaurant.id !== +product.restaurantId) {
        return writeStatus(res, true, {message: 'Permission denied'})
      }
    }

      const product = await serviceDecorator.update(service, converter, {data, options});
      writeStatus(res, false, product)
  } catch (e) {
    console.log(e);
    writeStatus(res, true, {message: 'Something want wrong'})
  }
}

exports.deleteProduct = async (req, res) => {
  const user = req.user;
  const id = req.params.id;

  try {
    if (user.role.includes(userRole.owner)) {
      const params = {where: {userId: user.id}};
      const userRestaurant = await serviceDecorator.getBy(restaurantService, restaurantConverter, params);
      const product = await service.getById(id)
      if (+userRestaurant.id !== +product.restaurantId) {
        return writeStatus(res, true, {status: 403, message: 'Permission denied'})
      }
    }

    const product = await serviceDecorator.delete(service, id);
    if (product) {
          return writeStatus(res, false, {message: 'Product deleted successful'});
        }
  } catch (e) {
    console.log(e);
    writeStatus(res, true, {message: 'Something want wrong'})
  }
}