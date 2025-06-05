import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import crypto from 'crypto';
import { verifyTurnstile } from '../utils/verifyRecaptcha';
import { sendEmail } from '../utils/sendEmail';
import { createVerificationEmailTemplate } from '../utils/emailTemplates';

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

interface JwtPayload {
  userId: number;
  username: string;
}

interface VerifyEmailRequest {
  token: string;
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
          username: user.username 
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
  }
};