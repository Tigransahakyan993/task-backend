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
  console.log('error',error);
  console.log('error.message',error.message);
  console.log('error.statusMessage',error.statusMessage);
  return res.status(500).json({ message: error.message || error.statusMessage})
});

app.listen(4000);