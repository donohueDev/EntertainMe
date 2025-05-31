import express from 'express';
import { userContentController } from '../controllers/userContentController';

const router = express.Router();

// Get anime for a specific user by their ID
router.get('/:userId/anime', userContentController.getUserAnimes);

// Submit or update a rating
router.post('/ratings', userContentController.submitAnimeRating);

// Get a specific anime's data for a user (reuse getUserGame for anime, or implement getUserAnime if needed)
router.get('/:userId/anime/:animeId', userContentController.getUserGame);

// Delete an anime from user's collection (reuse deleteUserGame for anime, or implement deleteUserAnime if needed)
router.delete('/:userId/anime/:animeId', userContentController.deleteUserGame);

export default router;