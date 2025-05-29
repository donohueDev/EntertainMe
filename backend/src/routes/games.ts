import express from 'express';
import { gamesController } from '../controllers/gamesController';

const router = express.Router();

// POST request to fetch and insert games from the RAWG API
router.post('/rawg-games', gamesController.loadGamesFromRawg);

// GET all games
router.get('/', gamesController.getAllGames);

// Get top 50 games
router.get('/top', gamesController.getTopGames);

// Search games by query
router.get('/search', gamesController.searchGames);

// Test route to check database connection
router.get('/test', gamesController.testConnection);

// GET game by ID
router.get('/:slug', gamesController.getGameBySlug);

// Update top games
router.post('/update-top-games', gamesController.updateTopGames);

export default router;