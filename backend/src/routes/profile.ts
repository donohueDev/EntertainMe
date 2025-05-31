import express from 'express';
import { getProfile, updateProfile } from '../controllers/profileController';
import { authenticateUser } from '../middleware/auth';

const router = express.Router();

// All profile routes require authentication
router.use(authenticateUser);

// Get user profile
router.get('/', getProfile);

// Update user profile
router.patch('/', updateProfile);

export default router;
