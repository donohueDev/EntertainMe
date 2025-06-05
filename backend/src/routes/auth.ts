import express from 'express';
import { authController } from '../controllers/authController';
import { authenticateUser } from '../middleware/auth';

const router = express.Router();

// Public routes
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/verify-email', authController.verifyEmail);
router.post('/resend-verification', authController.resendVerification);
router.get('/verification-status', authController.checkVerificationStatus);

// Protected route to get current user
router.get('/me', authenticateUser, authController.getCurrentUser);

export default router;