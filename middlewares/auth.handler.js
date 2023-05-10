const { unauthorized, forbidden } = require('@hapi/boom');
const { config } = require('../config/config');

function checkApiKey(req, res, next) {
  const apiKey = req.headers['api'];
  if (apiKey === config.apiKey) {
    next();
  } else {
     next(unauthorized());
  }
}

function adminCheck(req, res, next) {
  const user = req.user
  user.role === 'admin' ? next() :  next(forbidden('You must have administrator privileges'))
}

function roleCheck(...roles) {
  return (req, res, next) => {
  const user = req.user
  roles.includes(user.role) ? next() :  next(forbidden('You must have some privileges'))
}
}

module.exports = { checkApiKey, adminCheck, roleCheck };
