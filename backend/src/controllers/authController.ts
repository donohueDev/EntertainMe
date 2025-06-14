import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import crypto from 'crypto';
import axios from 'axios';
import { verifyTurnstile } from '../utils/verifyRecaptcha';
import { sendEmail } from '../utils/sendEmail';
import { createVerificationEmailTemplate, createPasswordResetEmailTemplate } from '../utils/emailTemplates';

dotenv.config();

const prisma = new PrismaClient();
export default prisma;

// Ensure JWT_SECRET exists
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined in environment variables');
}

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

interface RegisterRequest {
  email: string;
  username: string;
  password: string;
  recaptchaToken: string;
}

interface LoginRequest {
  username: string;
  password: string;
  recaptchaToken: string;
}

interface VerifyEmailRequest {
  token: string;
}

interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

interface GoogleUserInfo {
  email: string;
  name: string;
  id: string;
  picture?: string;
}

// Extend Express Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        username: string;
        display_name?: string | null;
        avatar_url?: string | null;
      }
    }
  }
}

export const authController = {
  register: async (req: Request<object, {}, RegisterRequest>, res: Response) => {
    const { email, username, password, recaptchaToken } = req.body;

    try {
      // Verify reCAPTCHA token
      const isValid = await verifyTurnstile(recaptchaToken);
      if (!isValid) {
        return res.status(400).json({ message: 'Failed to verify you are human. Please try again.' });
      }

      // Check if username or email already exists
      const existingUser = await prisma.user.findFirst({
        where: {
          OR: [
            { username: username },
            { email: email }
          ]
        }
      });

      if (existingUser) {
        if (existingUser.username === username) {
          return res.status(400).json({ message: 'Username already taken. Please choose a different username.' });
        }
        if (existingUser.email === email) {
          return res.status(400).json({ message: 'Email already registered. Please use a different email.' });
        }
      }

      // Generate verification token
      const verificationToken = crypto.randomBytes(32).toString('hex');
      const verificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Create new user with initial values and verification data
      const newUser = await prisma.user.create({
        data: {
          email,
          username,
          password: hashedPassword,
          email_verified: false,
          verification_token: verificationToken,
          verification_token_expires: verificationExpires,
          created_at: new Date()
        }
      });

      // Send verification email
      const emailTemplate = createVerificationEmailTemplate(username, verificationToken, FRONTEND_URL);
      await sendEmail({
        to: email,
        ...emailTemplate
      });

      return res.status(201).json({
        message: 'Registration successful! Please check your email to verify your account.',
        userId: newUser.id,
      });

    } catch (error) {
      console.error('Registration failed:', error);
      return res.status(500).json({ message: 'Internal server error during registration' });
    }
  },

  verifyEmail: async (req: Request<object, {}, VerifyEmailRequest>, res: Response) => {
    const { token } = req.body;

    try {
      // Find user with matching verification token
      const user = await prisma.user.findFirst({
        where: {
          verification_token: token,
          verification_token_expires: {
            gte: new Date() // Token hasn't expired
          }
        }
      });

      if (!user) {
        return res.status(400).json({ message: 'Invalid or expired verification token' });
      }

      // Update user to mark email as verified
      await prisma.user.update({
        where: { id: user.id },
        data: {
          email_verified: true,
          verification_token: null,
          verification_token_expires: null
        }
      });

      return res.status(200).json({ message: 'Email verified successfully' });
    } catch (error) {
      console.error('Error verifying email:', error);
      return res.status(500).json({ message: 'Server error verifying email' });
    }
  },

  resendVerification: async (req: Request, res: Response) => {
    const { email } = req.body;

    try {
      const user = await prisma.user.findUnique({
        where: { email }
      });

      if (!user) {
        // Return success even if email doesn't exist to prevent email enumeration
        return res.status(200).json({ message: 'Verification email sent if account exists' });
      }

      if (user.email_verified) {
        return res.status(400).json({ message: 'Email is already verified' });
      }

      // Generate new verification token
      const verificationToken = crypto.randomBytes(32).toString('hex');
      const verificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

      // Update user with new verification token
      await prisma.user.update({
        where: { id: user.id },
        data: {
          verification_token: verificationToken,
          verification_token_expires: verificationExpires
        }
      });

      // Send new verification email
      const emailTemplate = createVerificationEmailTemplate(user.username, verificationToken, FRONTEND_URL);
      await sendEmail({
        to: email,
        ...emailTemplate
      });

      return res.status(200).json({ message: 'Verification email sent if account exists', email: user.email });
    } catch (error) {
      console.error('Error resending verification:', error);
      return res.status(500).json({ message: 'Server error sending verification email' });
    }
  },

  login: async (req: Request<object, {}, LoginRequest>, res: Response) => {
    const { username, password, recaptchaToken } = req.body;

    try {
      // Verify reCAPTCHA token
      const isValid = await verifyTurnstile(recaptchaToken);
      if (!isValid) {
        return res.status(400).json({ message: 'Failed to verify you are human. Please try again.' });
      }

      // Find user by username
      const user = await prisma.user.findFirst({
        where: {
          OR: [
            { username: username },
            { email: username } // Allow login with email too
          ]
        }
      });

      if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }

      // Verify password
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }

      // Check if email is verified
      if (!user.email_verified) {
        console.log('Sending 403 to frontend with values:', {
          message: 'Please verify your email before logging in',
          requiresVerification: true,
          user: {
            email: user.email // Include email in response for verification flow
          }
        });
        return res.status(403).json({ 
          message: 'Please verify your email before logging in',
          requiresVerification: true,
          user: {
            email: user.email // Include email in response for verification flow
          }
        });
      }

      // Update login stats
      await prisma.user.update({
        where: { id: user.id },
        data: {
          last_login: new Date(),
          last_activity: new Date(),
          login_count: {
            increment: 1
          }
        }
      });

      // Generate JWT token
      const token = jwt.sign(
        { 
          userId: user.id, 
          username: user.username,
          display_name: user.display_name,
          avatar_url: user.avatar_url
        },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      return res.status(200).json({
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          display_name: user.display_name,
          avatar_url: user.avatar_url,
          preferences: user.preferences,
        }
      });
    } catch (error) {
      console.error('Login error:', error);
      return res.status(500).json({ message: 'Server error during login' });
    }
  },

  getCurrentUser: async (req: Request, res: Response) => {
    // The authenticateUser middleware will have already verified the token
    // and attached the user to req.user
    return res.json({ 
      userId: req.user?.id, 
      username: req.user?.username 
    });
  },

  checkVerificationStatus: async (req: Request, res: Response) => {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    try {
      const user = await prisma.user.findUnique({
        where: { email: email as string }
      });

      // Return false if user doesn't exist (to prevent email enumeration)
      if (!user) {
        return res.status(200).json({ isVerified: false });
      }

      return res.status(200).json({ isVerified: user.email_verified });
    } catch (error) {
      console.error('Error checking verification status:', error);
      return res.status(500).json({ message: 'Server error checking verification status' });
    }
  },
  changePassword: async (req: Request, res: Response) => {
    // Get userId from req.user (set by authenticateUser middleware)
    const userId = req.user?.id;
    const { currentPassword, newPassword } = req.body;

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
      // Find user by ID
      const user = await prisma.user.findUnique({
        where: { id: userId }
      });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Check current password
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Current password is incorrect.' });
      }

      // Hash new password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

      // Update password in DB
      await prisma.user.update({
        where: { id: userId },
        data: { password: hashedPassword }
      });

      // TODO: add logic to invalidate any existing sessions or tokens

      return res.status(200).json({ message: 'Password changed successfully.' });
    } catch (error) {
      console.error('Error changing password:', error);
      return res.status(500).json({ message: 'Server error changing password' });
    }
  },
  forgotPassword: async (req: Request, res: Response) => {
    const { email, recaptchaToken } = req.body;

    try {
      // Verify reCAPTCHA token
      const isValid = await verifyTurnstile(recaptchaToken);
      if (!isValid) {
        return res.status(400).json({ message: 'Failed to verify you are human. Please try again.' });
      }
      // Find user by email
      const user = await prisma.user.findUnique({
        where: { email }
      });
      if (!user) {
        // Return success even if email doesn't exist to prevent email enumeration
        return res.status(200).json({ message: 'If an account with that email exists, a password reset link has been sent.' });
      }
      // Generate password reset token
      const resetToken = crypto.randomBytes(32).toString('hex');
      const resetTokenExpires = new Date(Date.now() + 1 * 60 * 60 * 1000); // 1 hour
      // Update user with reset token
      await prisma.user.update({
        where: { id: user.id },
        data: {
          reset_token: resetToken,
          reset_token_expires: resetTokenExpires
        }
      });
      // Send password reset email
      const emailTemplate = createPasswordResetEmailTemplate(user.username, resetToken, FRONTEND_URL);
      await sendEmail({
        to: email,
        ...emailTemplate
      });
      return res.status(200).json({ message: 'If an account with that email exists, a password reset link has been sent.' });
    } catch (error) {
      console.error('Error sending password reset email:', error);
      return res.status(500).json({ message: 'Server error sending password reset email' });
    }
  },

  verifyPasswordReset: async (req: Request, res: Response) => {
    const { token, newPassword, recaptchaToken } = req.body;

    try {
      // Verify reCAPTCHA token
      const isValid = await verifyTurnstile(recaptchaToken);
      if (!isValid) {
        return res.status(400).json({ message: 'Failed to verify you are human. Please try again.' });
      }

      // Find user with matching reset token that hasn't expired
      const user = await prisma.user.findFirst({
        where: {
          reset_token: token,
          reset_token_expires: {
            gte: new Date() // Token hasn't expired
          }
        }
      });

      if (!user) {
        return res.status(400).json({ message: 'Invalid or expired reset token. Please request a new password reset link.' });
      }

      // Hash new password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

      // Update user's password and clear reset token
      await prisma.user.update({
        where: { id: user.id },
        data: {
          password: hashedPassword,
          reset_token: null,
          reset_token_expires: null
        }
      });

      return res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
      console.error('Error verifying password reset:', error);
      return res.status(500).json({ message: 'Server error verifying password reset' });
    }
  },

  googleAuth: async (_req: Request, res: Response) => {
    // Redirect to Google OAuth
    // if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_REDIRECT_URI_DEV) {
    //   return res.status(500).json({ message: 'Google OAuth configuration is missing' });
    // }
    // Construct the Google OAuth URL depending on the environment
    if (process.env.NODE_ENV !== 'production') {
      const redirectUri = `https://accounts.google.com/o/oauth2/auth?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${process.env.GOOGLE_REDIRECT_URI_DEV}&response_type=code&scope=email profile`;
      res.redirect(redirectUri);
    }
    if (process.env.NODE_ENV === 'production') {
      const redirectUri = `https://accounts.google.com/o/oauth2/auth?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${process.env.GOOGLE_REDIRECT_URI_PROD}&response_type=code&scope=email profile`;
      res.redirect(redirectUri);
    }
  },

  googleAuthCallback: async (req: Request, res: Response) => {
    const { code } = req.query;

    try {
      // Exchange authorization code for access token
      const tokenResponse = await axios.post(`https://oauth2.googleapis.com/token`, {
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.GOOGLE_REDIRECT_URI_DEV,
        grant_type: 'authorization_code'
      });
      const { access_token } = tokenResponse.data as TokenResponse;
      if (!access_token) {
        return res.status(400).json({ message: 'Failed to obtain access token from Google' });
      }
      // Fetch user info from Google
      const userInfoResponse = await axios.get(`https://www.googleapis.com/oauth2/v2/userinfo`, {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      });

      const user = userInfoResponse.data as GoogleUserInfo;

      // Find or create user in your database
      let dbUser = await prisma.user.findUnique({
        where: { email: user.email }
      });

      if (!dbUser) {
        // Generate username from email
        const emailPrefix = user.email.split('@')[0];
        let username = emailPrefix;
        
        let i = 1;
        while (await prisma.user.findUnique({ where: { username } })) {
          username = `${emailPrefix}${i++}`;
        }

        dbUser = await prisma.user.create({
          data: {
            email: user.email,
            username: username,
            password: '', // Empty password for Google-authenticated users
            email_verified: true, // Google users are pre-verified
            authType: 'GOOGLE',
            avatar_url: user.picture || '', // Use Google profile picture if available
            created_at: new Date(),
          }
        });
      }

      // Generate JWT token for the user with more information
      const token = jwt.sign(
        { 
          userId: dbUser.id,
          username: dbUser.username,
          display_name: dbUser.display_name,
          avatar_url: dbUser.avatar_url
        }, 
        JWT_SECRET, 
        { expiresIn: '7d' }  // Increased token expiration to 7 days
      );

      // Redirect to OAuth callback page with token
      return res.redirect(`${FRONTEND_URL}/auth/oauth-callback?token=${token}`);
    } catch (error) {
      console.error('Error during Google auth callback:', error);
      return res.status(500).json({ message: 'Server error during Google auth callback' });
    }
  },

};