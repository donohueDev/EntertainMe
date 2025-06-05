import express from 'express';
import cors from 'cors';
import { accountRouter } from './routes/auth';

const app = express();

// Configure CORS for testing
app.use(cors());

// Middleware
app.use(express.json());

// Set up the auth routes
app.use('/api/auth', accountRouter);

// Export for testing
export default app;
