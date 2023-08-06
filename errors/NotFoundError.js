const {
  HTTP_STATUS_NOT_FOUND,
  MESSAGE_ERROR_NOT_FOUND,
} = require('../utils/Constants');

class NotFoundError extends Error {
  constructor(message = MESSAGE_ERROR_NOT_FOUND) {
    super(message);
    this.statusCode = HTTP_STATUS_NOT_FOUND;
  }
}

module.exports = NotFoundError;
