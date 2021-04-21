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

initDb();


app.use(cors());

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// for Passport:
app.use(session({ secret: 'SECRET' }));
app.use(passport.initialize());
app.use(passport.session());

router(app);

app.options('*', cors());


app.listen(4000);