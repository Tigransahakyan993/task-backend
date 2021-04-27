const express = require('express');
const restaurantsController = require("../controller/restaurantController");
const restaurants = express.Router();
const passport = require('passport');
const authGuard = require('node-auth-guard');
const requireAuth = passport.authenticate('jwt', {session: false});
const initFields = authGuard.initialize({rolesField: 'role'});

restaurants.get('/',
  requireAuth,
  initFields,
  authGuard.roles('owner', 'buyer', 'admin'),
  restaurantsController.getAllRestaurants
)

restaurants.get('/:id',
  requireAuth,
  initFields,
  authGuard.roles('owner', 'buyer', 'admin'),
  restaurantsController.getRestaurant
)

restaurants.post('/',
  requireAuth,
  initFields,
  authGuard.roles('owner', 'buyer', 'admin'),
  restaurantsController.createRestaurant
)

restaurants.put('/:id',
  requireAuth,
  initFields,
  authGuard.roles('owner', 'buyer', 'admin'),
  restaurantsController.updateRestaurant
)

restaurants.delete('/:id',
  requireAuth,
  initFields,
  authGuard.roles('owner', 'buyer', 'admin'),
  restaurantsController.deleteRestaurant
)

module.exports = restaurants;