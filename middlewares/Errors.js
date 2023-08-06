const {
  MESSAGE_ERROR_FATAL,
  HTTP_STATUS_INTERNAL_SERVER_ERROR: STATUS_FATAL,
} = require('../utils/Constants');

module.exports = (err, _, res, next) => {
  const {
    statusCode = STATUS_FATAL,
    message,
  } = err;

  res.status(statusCode).send({
    message: statusCode === STATUS_FATAL
      ? MESSAGE_ERROR_FATAL
      : message,
  });

  return next(err);
};
