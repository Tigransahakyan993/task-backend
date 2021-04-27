const converter = require('../dto_converter/usersConverter');
const UserService = require('../servise/UserService');
const userService = new UserService();
const serviceDecorator = require('../dto_converter/service-decorator');
const jwt = require('jsonwebtoken');
const {writeStatus} = require("../../utils");
const config = require("../../config");
const {userRole} = config;

exports.logIn = async (req, res) => {
  const token = jwt.sign({payload: req.user}, 'secret');
  res.status(200).json({user: req.user, token});
}

exports.register = async (req, res) => {
  const data = req.body;
  data.role = userRole.buyer;

  try {
    const user = await serviceDecorator.create(userService, converter, data);
    const token = jwt.sign({payload: user}, config.jwt.secret);

    writeStatus(res, 200, {token, user});
  } catch (e) {
    console.log(e);
    writeStatus(res, 401, {message: e.message});
  }
}

exports.getCurrentUser = (req, res) => {
  console.log('req.user:::::::',req.user);
  writeStatus(res, 401, {user: req.user});
}