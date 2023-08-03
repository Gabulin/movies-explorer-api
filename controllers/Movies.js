const Movie = require('../models/movie');
const InvalidError = require('../errors/InvalidError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const { MESSAGE_ERROR_NOT_FOUND, MESSAGE_ERROR_INVALID, MESSAGE_ERROR_WRONG_DELETE, MESSAGE_ERROR_WRONG_ID } = require('../utils/Constants');

const getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.status(200).send(movies))
    .catch(next);
};

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner: req.user._id,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => movie.populate('owner').execPopulate())
    .then((data) => res.status(201).send(data))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new InvalidError(MESSAGE_ERROR_INVALID));
      }
      return next(err);
    });
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(MESSAGE_ERROR_NOT_FOUND);
      }

      if (movie.owner.equals(req.user._id)) {
        return movie.deleteOne().then(() => res.send({ deletedMovie: movie }));
      }

      return next(new ForbiddenError(MESSAGE_ERROR_WRONG_DELETE));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new InvalidError(MESSAGE_ERROR_WRONG_ID));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
