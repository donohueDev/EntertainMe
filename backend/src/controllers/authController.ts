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

      // Create new user
      const newUser = await prisma.user.create({
        data: {
          email,
          username,
          password: hashedPassword,
        },
        select: {
          id: true,
          email: true,
          username: true,
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
        }
      });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign(
        { userId: user.id, username: user.username },
        JWT_SECRET,
        { expiresIn: '1h' }
      );

      return res.json({
        token,
        userId: user.id,
        username: user.username,
        email: user.email
      });
    } catch (error) {
      console.error('Login failed:', error);
      return res.status(500).json({ message: 'Internal server error during login' });
    }
  },

  getCurrentUser: async (req: Request, res: Response) => {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authorization header missing or malformed' });
    }

    const token = authHeader.split(' ')[1];
    
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        select: { id: true, username: true }
      });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      return res.json({ userId: user.id, username: user.username });
    } catch (error) {
      console.error('Token verification failed:', error);
      return res.status(401).json({ message: 'Invalid or expired token' });
    }
  }
};