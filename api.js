require('./api/connection/connection');
require('./config/passport');
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();
const router = require('./api/router');
const {initDb} = require('./api/init/dbInit');
const {writeStatus} = require('./utils')

initDb()

app.use(cors());
app.options('*', cors());

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// for Passport:
app.use(session({ secret: 'SECRET' }));
app.use(passport.initialize(undefined));
app.use(passport.session(undefined));

router(app)

//Error handler
app.use((error, req, res, next) => {
  const message = error.message || error.statusMessage;
  return writeStatus(res, true, {message});
});

app.listen(4000);