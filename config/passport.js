const User = require('../api/model/User');
const Restaurant = require('../api/model/Restaurant');
const passport = require('passport');
const config = require('../config');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const bcrypt = require('bcrypt');

const localOptions = {
  usernameField: 'email',
};

const localLogin = new LocalStrategy(localOptions, async (email, password, done) => {
  try {
    const user = await User.findOne({
      where: {
        email: email.toLowerCase(),
      },
      include: {model: Restaurant, as: 'restaurants'}
    });
    const wrongCredentials = !user || !user.password;
    const passwordMatch = bcrypt.compareSync(password, user.password);
    if (wrongCredentials || !passwordMatch) {
      console.log('Wrong email or password');
      return done({
        message: 'Wrong email or password',
        statusCode: 401,
      }, false);
    }
    return done(null, user);
  } catch (err) {
    return done({
      message: 'Internal error',
      statusCode: 500,
    }, false);
  }
});

const jwtOpt = {};
jwtOpt.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOpt.secretOrKey = config.jwt.secret;

const jwtLogin = new JwtStrategy(jwtOpt, async ({payload}, done) => {
  try {
    const user = await User.findOne({ where: { id: payload.id }, include: {model: Restaurant, as: 'restaurants'} });
    if (!user) {
      return done(null, false);
    }
      return done(null, user);

  } catch (err) {
    return done(err, false);
  }
});

passport.use(localLogin);
passport.use(jwtLogin);