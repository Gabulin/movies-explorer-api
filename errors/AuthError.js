const { STATUS_AUTH } = require('../utils/Constants');

class AuthError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = STATUS_AUTH;
  }
}

module.exports = AuthError;
