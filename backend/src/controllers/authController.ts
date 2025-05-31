import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();
export default prisma;



// Ensure JWT_SECRET exists
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined in environment variables');
}

interface RegisterRequest {
  email: string;
  username: string;
  password: string;
}

interface LoginRequest {
  username: string;
  password: string;
}

interface JwtPayload {
  userId: number;
  username: string;
}

export const authController = {
  register: async (req: Request<object, {}, RegisterRequest>, res: Response) => {
    const { email, username, password } = req.body;
    console.log("Request to /api/accounts/register");

    try {
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

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Create new user with initial values
      const newUser = await prisma.user.create({
        data: {
          email,
          username,
          password: hashedPassword,
          display_name: username, // Initially set display name to username
          last_login: new Date(),
          last_activity: new Date(),
          is_active: true,
          login_count: 1,
          preferences: {},
          content_filters: {},
        },
        select: {
          id: true,
          email: true,
          username: true,
          display_name: true,
          avatar_url: true,
          preferences: true,
        },
      });

      const token = jwt.sign(
        { userId: newUser.id, username: newUser.username },
        JWT_SECRET,
        { expiresIn: '1h' }
      );

      return res.status(201).json({
        message: 'User registered successfully',
        token,
        userId: newUser.id,
        username: newUser.username,
        email: newUser.email
      });

    } catch (error) {
      console.error('Registration failed:', error);
      return res.status(500).json({ message: 'Internal server error during registration' });
    }
  },

  login: async (req: Request<object, {}, LoginRequest>, res: Response) => {
    const { username, password } = req.body;
    console.log("Request to /api/accounts/login");

    try {
      // Find user by username or email
      const user = await prisma.user.findFirst({
        where: {
          OR: [
            { username: username },
            { email: username }
          ]
        },
        select: {
          id: true,
          email: true,
          username: true,
          password: true,
          display_name: true,
          avatar_url: true,
          preferences: true,
          last_login: true,
          last_activity: true
        }
      });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      // Update last_login and last_activity
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

      const token = jwt.sign(
        { userId: user.id, username: user.username },
        JWT_SECRET,
        { expiresIn: '1h' }
      );

      const { password: _, ...userWithoutPassword } = user;
      
      return res.json({
        message: 'Login successful',
        token,
        user: userWithoutPassword
      });
    } catch (error) {
      console.error('Login failed:', error);
      return res.status(500).json({ message: 'Internal server error during login' });
    }
  },

  getCurrentUser: async (req: Request, res: Response) => {
    // The authenticateUser middleware will have already verified the token
    // and attached the user to req.user
    return res.json({ 
      userId: req.user?.id, 
      username: req.user?.username 
    });
  }
};