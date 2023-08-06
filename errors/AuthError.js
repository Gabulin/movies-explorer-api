const {
  HTTP_STATUS_UNAUTHORIZED,
  MESSAGE_ERROR_AUTH_REQUIRED,
} = require('../utils/Constants');

class AuthError extends Error {
  constructor(message = MESSAGE_ERROR_AUTH_REQUIRED) {
    super(message);
    this.statusCode = HTTP_STATUS_UNAUTHORIZED;
  }
}

module.exports = AuthError;
