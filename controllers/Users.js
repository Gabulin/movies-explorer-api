const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const RegisterError = require('../errors/RegisterError');
const NotFoundError = require('../errors/NotFoundError');
const InvalidError = require('../errors/InvalidError');
const { CURRENT_JWT_SECRET } = require('../utils/Config');
const { MESSAGE_ERROR_INVALID, MESSAGE_ERROR_NOT_FOUND_USER, MESSAGE_ERRIR_USER_EXISTS } = require('../utils/Constants');

const getUsers = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => next(new NotFoundError(MESSAGE_ERROR_NOT_FOUND_USER)))
    .then((users) => res.send(users))
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => res.status(201).send({
      _id: user._id,
      email: user.email,
      name: user.name,
    }))
    .catch((err) => {
      if (err.code === 11000) {
        return next(new RegisterError(MESSAGE_ERRIR_USER_EXISTS));
      }
      if (err.name === 'ValidationError') {
        return next(new InvalidError(MESSAGE_ERROR_INVALID));
      }
      return next(err);
    });
};

const updateProfile = (req, res, next) => {
  const { name, email } = req.body;

  return User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    { new: true, runValidators: true },
  )
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new InvalidError(MESSAGE_ERROR_INVALID));
      }

      return next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, CURRENT_JWT_SECRET, {
        expiresIn: '7d',
      });

      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
      });

      return res.send({ token });
    })
    .catch(next);
};

const logout = (req, res) => {
  res
    .cookie('jwt', 'jwt.token.revoked', {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      maxAge: -1,
    })
    .send({ message: 'Сессия завершена' });
};

module.exports = {
  getUsers,
  updateProfile,
  createUser,
  login,
  logout,
};
