const {
  HTTP_STATUS_BAD_REQUEST,
  MESSAGE_ERROR_INVALID,
} = require('../utils/Constants');

class InvalidError extends Error {
  constructor(message = MESSAGE_ERROR_INVALID) {
    super(message);
    this.statusCode = HTTP_STATUS_BAD_REQUEST;
  }
}

module.exports = InvalidError;
