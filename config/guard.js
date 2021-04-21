const authGuard = require('node-auth-guard');
const initConfig = {
  principalPath: 'user',
  rolesField: 'role'
}

exports.check = (...roles) => {
  try {
     authGuard.initialize(initConfig)
  } catch (e) {
    console.log('Guard check error')
  }
}