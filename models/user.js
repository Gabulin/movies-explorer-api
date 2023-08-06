const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { AuthError } = require('../errors');
const {
  MESSAGE_ERROR_AUTH_WRONG_DATA,
  MESSAGE_ERROR_WRONG_EMAIL,
} = require('../utils/Constants');

// Определение схемы пользователя
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: MESSAGE_ERROR_WRONG_EMAIL,
    },
  },
  password: {
    type: String,
    required: true,
    select: false, // Пароль не будет возвращаться в результатах запросов
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
});

// Метод findByCredentials для поиска пользователя по email и проверки пароля
userSchema.statics.findByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password') // Вернуть поле password (select: true)
    .then((user) => {
      if (!user) {
        throw new AuthError(MESSAGE_ERROR_AUTH_WRONG_DATA);
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new AuthError(MESSAGE_ERROR_AUTH_WRONG_DATA);
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
