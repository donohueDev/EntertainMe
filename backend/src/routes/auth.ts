import express from 'express';
import { authController } from '../controllers/authController';

const router = express.Router();

// Register endpoint
router.post('/register', authController.register);

// Login endpoint
router.post('/login', authController.login);

// Protected route to get current user
router.get('/me', authController.getCurrentUser);

export { router as accountRouter };