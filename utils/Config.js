const { NODE_ENV, JWT_SECRET, MONGO_ADDRESS } = process.env;
const CURRENT_JWT_SECRET = NODE_ENV === 'production' ? JWT_SECRET : 'secret-key';
const CURRENT_MONGO_ADDRESS = NODE_ENV === 'production' ? MONGO_ADDRESS : 'mongodb://127.0.0.1:27017/bitfilmsdb';

module.exports = {
  CURRENT_JWT_SECRET,
  CURRENT_MONGO_ADDRESS,
};