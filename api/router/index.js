const auth = require('./auth');
const users = require('./user');
const restaurants = require('./restaurants');
const orders = require('./order');
const products = require('./product');

function router(app) {
  app.use('/auth', auth)
  app.use('/users', users)
  app.use('/restaurants', restaurants)
  app.use('/orders', orders)
  app.use('/products', products)
}

module.exports = router;