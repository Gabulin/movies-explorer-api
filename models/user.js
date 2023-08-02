const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const AuthError = require('../errors/AuthError');

// Определение схемы пользователя
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'Некорректные данные почты',
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
userSchema.statics.findByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password') // Вернуть поле password (select: true)
    .then((user) => {
      if (!user) {
        throw new AuthError('Некорректные данные почты или пароля');
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new AuthError('Некорректные данные почты или пароля');
          }

          return user;
        });
    });
};

// Экспорт модели пользователя
module.exports = mongoose.model('user', userSchema);
