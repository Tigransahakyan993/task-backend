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

app.use(cors());

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// for Passport:
app.use(session({ secret: 'SECRET' }));
app.use(passport.initialize());
app.use(passport.session());

// app.options('*', cors());
router(app);

//Error handler
app.use((error, req, res, next) => {
  return res.status(500).json({ error: error.toString() })
});

app.listen(4000);