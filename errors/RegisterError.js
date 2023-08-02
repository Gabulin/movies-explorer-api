const { STATUS_CONFLICT } = require('../utils/Constants');

class RegisterError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = STATUS_CONFLICT;
  }
}

module.exports = RegisterError;
