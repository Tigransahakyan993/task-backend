const express = require('express');
const authController = require("../controller/authController");
const auth = express.Router();
const passport = require('passport');
const requireAuth = passport.authenticate('local', {session: false});

auth.post('/register', authController.register);

auth.post('/login', requireAuth, authController.logIn);

module.exports = auth;