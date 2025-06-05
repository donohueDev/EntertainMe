import express from 'express';
import cors from 'cors';
import authRouter from '../src/routes/auth';

const app = express();

// Configure CORS for testing
app.use(cors());

// Middleware
app.use(express.json());

// Set up the auth routes
app.use('/api/auth', authRouter);

// Export for testing
export default app;
