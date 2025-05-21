// protectedRoute.ts initially used with jwt but was having issues 
// pivoted to a more basic implementation of user authorization for now

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

interface JwtPayload {
  userId: number;
  [key: string]: any;
}

interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
  userId?: number;
}

const protectedRoute = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  dotenv.config();
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  const token = authHeader.split(' ')[1]; // Extract the token from the Authorization header

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: Token is missing' });
  }

  try {
    // Verify the token using the JWT secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

    // Extract the user ID from the decoded payload
    const userId = decoded.userId;  // Assuming the JWT contains a userId field
    req.user = decoded; // Attach the decoded payload to req.user
    req.userId = userId; // Optionally attach the userId directly to req
    console.log("Decoded user: ", req.userId);
    next(); // Continue to the route handler
  } catch (error) {
    console.error('Token verification failed:', error);
    res.status(403).json({ message: 'Forbidden: Invalid token' });
  }
};

export default protectedRoute; 