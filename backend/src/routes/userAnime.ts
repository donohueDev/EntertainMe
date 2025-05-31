import express from 'express';
import { userContentController } from '../controllers/userContentController';

const router = express.Router();

// Get anime for a specific user by their ID
router.get('/:userId/anime', userContentController.getUserAnimes);

// Submit or update a rating
router.post('/ratings', userContentController.submitAnimeRating);

// Get a specific anime from the user collection
router.get('/:userId/anime/:animeId', userContentController.getUserAnime);

// Delete an anime from the user collection
router.delete('/:userId/anime/:animeId', userContentController.deleteUserAnime);

export default router;