import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { PrismaClient } from '@prisma/client';
import RAWGGamesRouter from './routes/games';
import { accountRouter } from './routes/auth';
import userGamesRoute from './routes/userGames';
// import animeRouter from '../routes/anime';
// import searchRouter from '../routes/search';
// import moviesRouter from '../routes/movies';
// import showsRouter from '../routes/shows';
// import protectedRoute from '../routes/protectedRoute';

// Load environment variables from root directory
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const app = express();
const PORT = process.env.PORT ?? 5001;
const NODE_ENV = process.env.NODE_ENV ?? 'development';

// Initialize Prisma Client
console.log('Initializing Prisma Client...');
const prisma = new PrismaClient();
console.log('Prisma Client initialized successfully');

// Add request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Configure CORS
const allowedOrigins =
  NODE_ENV === 'production'
    ? [
        'https://entertainmentme.onrender.com',
        'http://localhost:3000',
        'https://entertain-me-chi.vercel.app',
        'https://www.entertainme.pro',
        'https://entertainme.pro'
      ]
    : ['http://localhost:3000'];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true); // allow non-browser requests
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error('Not allowed by CORS'));
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

// Middleware
app.use(express.json());

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error details:', {
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method
  });
  res.status(500).json({
    message: 'Something went wrong!',
    error: NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// Set up the routes
app.use('/api/games', RAWGGamesRouter);
app.use('/api/userGames', userGamesRoute);
app.use('/api/accounts', accountRouter);

// app.use('/api/anime', animeRouter);
// app.use('/api/search', searchRouter);
// app.use('/api/movies', moviesRouter);
// app.use('/api/shows', showsRouter);
// app.use('/api/protected', protectedRoute);

// Health check route
app.get('/health', (req, res) => {
  res.json({ status: 'ok', environment: NODE_ENV });
});

// Ping route to keep service alive
app.get('/ping', (req, res) => {
  res.status(200).send('pong');
});

// Basic route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to the Entertainment API',
    environment: NODE_ENV,
    version: process.env.npm_package_version ?? '1.0.0'
  });
});

// Start server and check Prisma connection
async function startServer() {
  try {
    await prisma.$connect(); // Ensure Prisma Client can connect to the database
    console.log('Database connection successful');

    app.listen(PORT, () => {
      console.log(`Server is running in ${NODE_ENV} mode on port ${PORT}`);
      console.log('Environment variables loaded:', {
        NODE_ENV,
        PORT,
        DB_HOST: process.env.DB_HOST,
        DB_NAME: process.env.DB_NAME,
        DB_USER: process.env.DB_USER
      });
    });
  } catch (error) {
    console.error('Failed to connect to the database:', error);
    process.exit(1);
  }
}

console.log('DATABASE_URL:', process.env.DATABASE_URL);

startServer();