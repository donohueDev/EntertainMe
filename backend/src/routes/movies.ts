import express from 'express';
import { moviesController } from '../controllers/moviesController';

const router = express.Router();

// POST request to fetch and insert movies from the TMDB API
router.post('/tmdb-movies', moviesController.loadMoviesFromTmdb);

// GET all movies
router.get('/', moviesController.getAllMovies);

// Get top 50 movies
router.get('/top', moviesController.getTopMovies);

// Search movies by query
router.get('/search', moviesController.searchMovies);

// Test route to check database connection
router.get('/test', moviesController.testConnection);

// GET movie by ID
router.get('/:id', moviesController.getMovieById);

export default router;
