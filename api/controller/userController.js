const UserService = require('../servise/UserService');
const userService = new UserService();
const converter = require('../dto_converter/usersConverter');
const paramsConverter = require('../dto_converter/paramsConverter');
const serviceDecorator = require('../dto_converter/service-decorator');
const { writeStatus } = require('../../utils');
const {userRole} = require('../../config');

exports.getUser = async (req, res) => {
  try {
    const id = req.params.id;
    const requestedUser = await serviceDecorator.getById(userService, converter, id);

      writeStatus(res, 200, {user: requestedUser});

  } catch (e) {
    console.log(e.message);
    writeStatus(res, 401, {message: e.message});
  }
}

exports.getAllUsers = async (req, res) => {
  const params = paramsConverter.toDto(req.query);

  const users = await serviceDecorator.getAll(userService, converter, params);
    writeStatus(res, 200, users);
}

exports.createUser = async (req, res) => {
  try {
    const data = req.body;
    const user = await serviceDecorator.create(userService, converter, data);
    writeStatus(res, 200, user);
  } catch (e) {
    console.log('e.message',e.message);
    writeStatus(res, 401, {message: e.message});
  }
}

exports.getCurrentUser = async (req, res) => {
  try {
    const { user } = req;
    if (!user) {
      writeStatus(res, 401, {message: 'Unauthorized'});
      return;
    }
    writeStatus(res, 200, {user: req.user});

  } catch (e) {
    writeStatus(res, 401, {message: e.message})
  }
}