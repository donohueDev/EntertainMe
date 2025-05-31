import express from 'express';
import { authController } from '../controllers/authController';
import { authenticateUser } from '../middleware/auth';

const router = express.Router();

// Public routes
router.post('/register', authController.register);
router.post('/login', authController.login);

// Protected route to get current user
router.get('/me', authenticateUser, authController.getCurrentUser);

export { router as accountRouter };