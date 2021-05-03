module.exports = {
  userRole: {
    owner: 'owner',
    buyer: 'buyer',
    admin: 'admin'
  },
  orderStatus: {
    placed: 'placed',
    canceled: 'canceled',
    processing: 'processing',
    inRout: 'inRout',
    delivered: 'delivered',
    received: 'received'
  },
  jwt: {
    secret: 'secret',
    algorithm: 'RS256',
  },
  salt: {
    saltRounds: 10,
  }
}