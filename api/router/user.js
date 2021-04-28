const express = require('express');
const userController = require("../controller/userController");
const user = express.Router();
const passport = require('passport');
const authGuard = require('node-auth-guard');
const requireAuth = passport.authenticate('jwt', {session: false});
const initRoleField = authGuard.initialize({rolesField: 'role'});

user.get('/',
  requireAuth,
  initRoleField,
  authGuard.roles('admin'),
  userController.getAllUsers
)

user.get('/getCurrentUser',
  requireAuth,
  userController.getCurrentUser
)

user.get('/:id',
  requireAuth,
  initRoleField,
  authGuard.roles('admin'),
  userController.getUser
)

user.post('/',
  requireAuth,
  initRoleField,
  authGuard.roles('admin'),
  userController.createUser
)

module.exports = user;