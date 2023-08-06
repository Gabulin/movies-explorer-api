const jwt = require('jsonwebtoken');
const { AuthError } = require('../errors');
const { JWT_SECRET } = require('../utils/Config');

module.exports = (req, _, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new AuthError());
  }

  const token = authorization.replace('Bearer ', '');

  if (!token) {
    return next(new AuthError());
  }

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return next(new AuthError());
  }

  req.user = payload;

  return next();
};
