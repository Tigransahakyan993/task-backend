const UserService = require('../servise/UserService');
const RestaurantService = require('../servise/RestaurantService');
const userService = new UserService();
const restaurantService = new RestaurantService();
const serviceDecorator = require('../dto_converter/service-decorator');
const userConverter = require('../dto_converter/usersConverter');
const restaurantConverter = require('../dto_converter/restaurantConverter');
const jwt = require('jsonwebtoken');
const {writeStatus} = require("../../utils");
const config = require("../../config");
const {userRole} = config;

exports.logIn = async (req, res) => {
  const token = jwt.sign({payload: req.user}, 'secret');
  const user = userConverter.fromDto(req.user);
  writeStatus(res, false, {data: user, token});
}

exports.register = async (req, res) => {
  const data = req.body;

  try {
    const user = await serviceDecorator.create(userService, userConverter, data);

    if (data.role === userRole.owner) {
      const restaurantData = {
        userId: user.id,
        name: '',
        description: ''
      }
      await serviceDecorator.create(restaurantService, restaurantConverter, restaurantData);
    }
    const token = jwt.sign({payload: user}, config.jwt.secret);

    writeStatus(res, false, {token, user});
  } catch (e) {
    console.log(e);
    writeStatus(res, true, {status: 401, message: e.message});
  }
}

exports.getCurrentUser = (req, res) => {
  const user = userConverter.fromDto(req.user);
  writeStatus(res, false, {data: user});
}