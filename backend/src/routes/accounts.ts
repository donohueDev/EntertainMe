import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';

interface User {
  id: number;
  email: string;
  username: string;
  password: string;
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

const router = express.Router();

// Initialize SQLite connection
const dbPromise = open({
  filename: './database/entertainme.db',
  driver: sqlite3.Database
});

// Register endpoint to create new user and add to database
router.post('/register', async (req: Request<{}, {}, RegisterRequest>, res: Response) => {
  const { email, username, password } = req.body;
  console.log("Request to /api/accounts/register");

  try {
    const db = await dbPromise;

    // Check if the username already exists
    const existingUser = await db.get<User>('SELECT * FROM users WHERE username = ?', [username]);
    if (existingUser) {
      return res.status(400).json({ message: 'Username already taken. Please choose a different username.' });
    }

    // Check if the email already exists
    const existingEmail = await db.get<User>('SELECT * FROM users WHERE email = ?', [email]);
    if (existingEmail) {
      return res.status(400).json({ message: 'Email already registered. Please use a different email.' });
    }

    // Insert the new user into the database (password is stored in plain text)
    const result = await db.run('INSERT INTO users (email, username, password) VALUES (?, ?, ?)', [email, username, password]);

    // Retrieve the userId of the newly inserted user
    const userId = result.lastID;

    // Send the response with userId and other necessary information
    return res.status(201).json({
      message: 'User registered successfully',
      userId: userId,
      username: username,
      email: email
    });

  } catch (error) {
    console.error('Registration failed:', error);
    return res.status(500).json({ message: 'Internal server error during registration' });
  }
});

// Login endpoint 
router.post('/login', async (req: Request<{}, {}, LoginRequest>, res: Response) => {
  const { username, password } = req.body;
  console.log("Request to /api/accounts/login");

  try {
    const db = await dbPromise;
    // Check if user exists
    const user = await db.get<User>('SELECT * FROM users WHERE username = ?', [username]);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Directly compare username and password (insecure for now)
    if (username === user.username && password === user.password) {
      console.log("Logging in with user:", user.id);
      return res.json({
        userId: user.id,
        username: user.username,
      });
    } else {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Login failed:', error);
    return res.status(500).json({ message: 'Internal server error during login' });
  }
});

// Protected route to get the current user's data
router.get('/me', (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization header missing or malformed' });
  }

  const token = authHeader.split(' ')[1];
  console.log("Token received:", token);
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    console.log("returned: ", decoded.userId);
    return res.json({ userId: decoded.userId, username: decoded.username });
  } catch (error) {
    console.error('Token verification failed:', error);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
});

export { router as accountRouter }; 