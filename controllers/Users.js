const bcrypt = require('bcryptjs');
const { ValidationError } = require('mongoose').Error;
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {
  InvalidError,
  RegisterError,
  NotFoundError,
} = require('../errors');
const { JWT_SECRET, JWT_KEY } = require('../utils/Config');
const {
  MONGODB_CONFLICT,
  MESSAGE_LOGOUT,
  HTTP_STATUS_CREATED,
  MESSAGE_ERROR_NOT_FOUND_USER,
} = require('../utils/Constants');

const getUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new NotFoundError(MESSAGE_ERROR_NOT_FOUND_USER))
    .then((user) => res.send(user))
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
    .then((user) => res.status(HTTP_STATUS_CREATED).send({
      _id: user._id,
      name: user.name,
      email: user.email,
    }))
    .catch((err) => {
      if (err.code === MONGODB_CONFLICT) {
        return next(new RegisterError());
      }

      if (err instanceof ValidationError) {
        return next(new InvalidError());
      }

      return next(err);
    })
    .catch(next);
};

const updateProfile = (req, res, next) => {
  const { name, email } = req.body;

  return User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    { new: true, runValidators: true },
  ).then((user) => res.send(user))
    .catch((err) => {
      if (err.code === MONGODB_CONFLICT) {
        return next(new RegisterError());
      }

      if (err instanceof ValidationError) {
        return next(new InvalidError());
      }

      return next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: '7d',
      });

      res.cookie(JWT_KEY, token, {
        maxAge: 86_400_000 * 7,
        httpOnly: true,
      });

      return res.send({ token });
    })
    .catch(next);
};

const logout = (_, res) => {
  res.clearCookie(JWT_KEY);
  res.send({ message: MESSAGE_LOGOUT });
};

module.exports = {
  updateProfile,
  createUser,
  getUser,
  logout,
  login,
};
