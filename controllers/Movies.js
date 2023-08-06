const { ValidationError } = require('mongoose').Error;
const Movie = require('../models/movie');
const {
  InvalidError,
  NotFoundError,
  ForbiddenError,
} = require('../errors');
const {
  HTTP_STATUS_OK,
  HTTP_STATUS_CREATED,
  MESSAGE_VIDEO_DELETED,
  MESSAGE_ERROR_WRONG_DELETE,
} = require('../utils/Constants');

const getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .populate(['owner'])
    .then((movies) => res.status(HTTP_STATUS_OK).send(movies))
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
    movieId,
    nameRU,
    nameEN,
    owner: req.user._id,
  })
    .then((movie) => movie.populate('owner'))
    .then((data) => res.status(HTTP_STATUS_CREATED).send(data))
    .catch((err) => {
      if (err instanceof ValidationError) {
        return next(new InvalidError());
      }

      return next(err);
    });
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(new NotFoundError())
    .then((movie) => {
      if (!movie.owner.equals(req.user._id)) {
        return next(new ForbiddenError(MESSAGE_ERROR_WRONG_DELETE));
      }

      return movie.deleteOne().then(() => res.send({
        message: MESSAGE_VIDEO_DELETED,
      })).catch(next);
    })
    .catch(next);
};

module.exports = {
  deleteMovie,
  createMovie,
  getMovies,
};
