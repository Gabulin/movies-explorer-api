const {
  MESSAGE_ERRIR_USER_EXISTS,
  HTTP_STATUS_CONFLICT,
} = require('../utils/Constants');

class RegisterError extends Error {
  constructor(message = MESSAGE_ERRIR_USER_EXISTS) {
    super(message);
    this.statusCode = HTTP_STATUS_CONFLICT;
  }
}

module.exports = RegisterError;
