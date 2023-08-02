const jwt = require('jsonwebtoken');
const AuthError = require('../errors/AuthError');
const { MESSAGE_ERROR_AUTH } = require('../utils/Constants');
const { CURRENT_JWT_SECRET } = require('../utils/Config');
module.exports = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new AuthError(MESSAGE_ERROR_AUTH));
  }

  const token = authorization.replace('Bearer ', '');

  if (!token) {
    return next(new AuthError(MESSAGE_ERROR_AUTH));
  }

  let payload;

  try {
    payload = jwt.verify(token, CURRENT_JWT_SECRET);
  } catch (err) {
    return next(new AuthError(MESSAGE_ERROR_AUTH));
  }
  req.user = payload;
  return next();
};
