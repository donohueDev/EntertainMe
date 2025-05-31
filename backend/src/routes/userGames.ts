import express from 'express';
import { userContentController } from '../controllers/userContentController';

const router = express.Router();

// Get games for a specific user by their ID
router.get('/:userId/games', userContentController.getUserGames);

// Submit or update a rating
router.post('/ratings', userContentController.submitGameRating);

// Get a specific game's data for a user
router.get('/:userId/games/:gameId', userContentController.getUserGame);

// Delete a game from user's collection
router.delete('/:userId/games/:gameId', userContentController.deleteUserGame);

export default router; 