const express = require('express');
const restaurantsController = require("../controller/restaurantController");
const restaurants = express.Router();
const passport = require('passport');
const requireAuth = passport.authenticate('jwt', {session: false});
const authGuard = require('node-auth-guard');

restaurants.use(requireAuth);
restaurants.use(authGuard.initialize({rolesField: 'role'}));

restaurants.get('/',
  authGuard.roles('owner'),
  restaurantsController.getAllRestaurants
)

restaurants.get('/:id',
  restaurantsController.getRestaurant
)

restaurants.post('/',
  restaurantsController.createRestaurant
)

restaurants.put('/:id',
  restaurantsController.updateRestaurant
)

restaurants.delete('/:id',
  restaurantsController.deleteRestaurant
)

module.exports = restaurants;