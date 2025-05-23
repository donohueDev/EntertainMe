import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from  'bcrypt';
import pool from '../config/database';
import dotenv from 'dotenv';
dotenv.config();

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

// Register endpoint to create new user and add to database
router.post('/register', async (req: Request<{}, {}, RegisterRequest>, res: Response) => {
  const { email, username, password } = req.body;
  console.log("Request to /api/accounts/register");

  try {
    // Check if the username already exists
    const existingUser = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: 'Username already taken. Please choose a different username.' });
    }

    // Check if the email already exists
    const existingEmail = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (existingEmail.rows.length > 0) {
      return res.status(400).json({ message: 'Email already registered. Please use a different email.' });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    // Insert the new user into the database
    const result = await pool.query(
      'INSERT INTO users (email, username, password) VALUES ($1, $2, $3) RETURNING id',
      [email, username, hashedPassword]
    );

    const userId = result.rows[0].id;

    // Generate JWT token
    const token = jwt.sign(
      { userId: userId, username: username },
      process.env.JWT_SECRET!,
      { expiresIn: '1h' }
    );

    return res.status(201).json({
      message: 'User registered successfully',
      token,
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
    // Check if user exists by username OR email
    const result = await pool.query(
      'SELECT * FROM users WHERE username = $1 OR email = $1',
      [username]
    );
    const user = result.rows[0];
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the password is correct using bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }else {
      console.log("Password is valid");
    }
    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      process.env.JWT_SECRET!,
      { expiresIn: '1h' }
    );
    console.log("Token generated:", token);
    // Send the token in the response
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