import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined in environment variables');
}

interface JwtPayload {
  userId: number;
  username: string;
  display_name?: string | null;
  avatar_url?: string | null;
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

export const authenticateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      res.status(401).json({ message: 'No token provided' });
      return;
    }

    const decoded = jwt.verify(token, JWT_SECRET) as {
      userId: number;
      username: string;
      display_name?: string | null;
      avatar_url?: string | null;
    };

    req.user = {
      id: decoded.userId,
      username: decoded.username,
      display_name: decoded.display_name,
      avatar_url: decoded.avatar_url
    };

    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};
