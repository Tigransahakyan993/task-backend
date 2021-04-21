const ProductService = require('../servise/ProductService')
const service = new ProductService();
const converter = require('../dto_converter/productConverter');
const paramsConverter = require('../dto_converter/paramsConverter');
const serviceDecorator = require('../dto_converter/service-decorator');
const { writeStatus } = require('../../utils');

exports.getAllProducts = async (req, res) => {
  const {restaurantId} = req.query;
  const params = paramsConverter.toDto(req.query)
  if (+restaurantId) {
    params.where = {restaurantId}
  }

  try {
    const products = await serviceDecorator.getAll(
      service,
      converter,
      params
    );
    console.log(restaurantId,products);
    writeStatus(res, 200, products)
  } catch (e) {
    console.log(e)
    writeStatus(res, 401, {message: 'Something want wrong'})
  }
}

exports.getProduct = async (req, res) => {
  const {id} = req.params;

  try {
    const restaurantItem = await serviceDecorator.getById(service, converter, id);
    writeStatus(res, 200, restaurantItem)
  }
  catch (e) {
    console.log(e);
    writeStatus(res, 401, {message: 'Something want wrong'})
  }
}

exports.createProduct = async (req, res) => {
  const data = req.body;
  const user = req.user;

  try {
    const restaurantItem = await serviceDecorator.create(service, converter, data);
    writeStatus(res, 200, restaurantItem)
  }catch (e) {
    console.log(e);
    writeStatus(res, 401, {message: 'Something want wrong'})
  }
}

exports.updateProduct = async (req, res) => {
  const data = req.body;

  try {
    const product = await serviceDecorator.update(service, converter, data);
    writeStatus(res, 200, product)
  } catch (e) {
    console.log(e);
    writeStatus(res, 401, {message: 'Something want wrong'})
  }
}

exports.deleteProduct = async (req, res) => {
  const data = req.body;
  //
  try {
    const restaurantItem = await serviceDecorator.delete(service, converter, id);
    writeStatus(res, 200, restaurantItem)
  }
  catch (e) {
    console.log(e);
    writeStatus(res, 401, {message: 'Something want wrong'})
  }
}