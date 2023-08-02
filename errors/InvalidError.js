const { STATUS_BAD_REQUEST } = require('../utils/Constants');

class InvalidError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = STATUS_BAD_REQUEST;
  }
}

module.exports = InvalidError;
