import express from 'express';
import { userGamesController } from '../controllers/userGamesController';

const router = express.Router();

// Get games for a specific user by their ID
router.get('/:userId/games', userGamesController.getUserGames);

// Submit or update a rating
router.post('/ratings', userGamesController.submitRating);

// Get a specific game's data for a user
router.get('/:userId/games/:gameId', userGamesController.getUserGame);

// Delete a game from user's collection
router.delete('/:userId/games/:gameId', userGamesController.deleteUserGame);

export default router; 