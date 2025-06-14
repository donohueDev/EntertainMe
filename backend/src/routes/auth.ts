import express from 'express';
import { authController } from '../controllers/authController';
import { authenticateUser } from '../middleware/auth';

const router = express.Router();

// Public post routes
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/verify-email', authController.verifyEmail);
router.post('/resend-verification', authController.resendVerification);
router.post('/forgot-password', authController.forgotPassword);
router.post('/verify-password-reset', authController.verifyPasswordReset);

// Public get routes
router.get('/verification-status', authController.checkVerificationStatus);

// Google OAuth routes
router.get('/google-auth', authController.googleAuth);
router.get('/google/callback', authController.googleAuthCallback);

// Protected route to get current user
router.get('/me', authenticateUser, authController.getCurrentUser);
router.post('/change-password', authenticateUser, authController.changePassword);

export default router;