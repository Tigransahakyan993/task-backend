const express = require('express');
const passport = require('passport');
const authGuard = require('node-auth-guard');
const restaurants = express.Router();
const restaurantsController = require("../controller/restaurantController");
const requireAuth = passport.authenticate('jwt', {session: false});
const initFields = authGuard.initialize({rolesField: 'role'});

restaurants.get('/',
  requireAuth,
  initFields,
  authGuard.roles('admin', 'owner', 'buyer'),
  restaurantsController.getAllRestaurants
)

restaurants.get('/:id',
  requireAuth,
  initFields,
  authGuard.roles('admin', 'owner', 'buyer'),
  restaurantsController.getRestaurant
)

restaurants.post('/',
  requireAuth,
  initFields,
  authGuard.roles('admin', 'owner'),
  restaurantsController.createRestaurant
)

restaurants.put('/:id',
  requireAuth,
  initFields,
  authGuard.roles('admin', 'owner'),
  restaurantsController.updateRestaurant
)

restaurants.delete('/:id',
  requireAuth,
  initFields,
  authGuard.roles('admin'),
  restaurantsController.deleteRestaurant
)

module.exports = restaurants;