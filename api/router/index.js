const auth = require('./auth');
const restaurants = require('./restaurants');
const order = require('./order');
const product = require('./product');

function router(app) {
  app.use('/auth', auth)
  app.use('/restaurants', restaurants)
  app.use('/order', order)
  app.use('/products', product)
}

module.exports = router;