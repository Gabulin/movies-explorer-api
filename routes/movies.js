const movieRouter = require('express').Router();

const { getMovies, createMovie, deleteMovie } = require('../controllers/Movies');

const { createMovieValidator, deleteMovieValidator } = require('../middlewares/Validate');


movieRouter.get('/movies', getMovies);
movieRouter.post('/movies', createMovieValidator, createMovie);

movieRouter.delete('/movies/:movieId', deleteMovieValidator, deleteMovie);

module.exports = movieRouter;
