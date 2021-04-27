const express = require('express');
const authController = require("../controller/authController");
const auth = express.Router();
const passport = require('passport');
const requireAuth = passport.authenticate('local', {session: false});
const requireAuthFromJwt = passport.authenticate('jwt', {session: false});

auth.post('/register', authController.register);

auth.post('/login', requireAuth, authController.logIn);

auth.get('/getCurrentUser', requireAuthFromJwt, authController.getCurrentUser);

module.exports = auth;