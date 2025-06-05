import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { PrismaClient } from '@prisma/client';
import RAWGGamesRouter from './routes/games';
import { accountRouter } from './routes/auth';
import userGames from './routes/userGames';
import userAnime from './routes/userAnime';
import animeRouter from './routes/anime';
import profileRouter from './routes/profile';
import cronRouter from './routes/cron';
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
const prisma = new PrismaClient();

// Add request logging middleware only for non-production environments
if (NODE_ENV !== 'production') {
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
  });
}

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

// Add support for Vercel preview URLs
const isVercelPreview = (origin: string | undefined) => {
  if (!origin) return false;
  return origin.match(/https:\/\/.*--.*\.vercel\.app$/) !== null ||
         origin.match(/https:\/\/.*-[a-z0-9]+-[a-z0-9]+\.vercel\.app$/) !== null;
};

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin) || isVercelPreview(origin)) {
        return callback(null, true);
      }
      // Only log CORS errors in development
      if (NODE_ENV !== 'production') {
        console.warn(`CORS blocked request from origin: ${origin}`);
      }
      return callback(new Error(`Origin ${origin} not allowed by CORS`));
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 204,
    maxAge: 86400
  })
);

// Handle preflight requests explicitly
app.options('*', cors());

// Middleware
app.use(express.json());

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  // Log error details in any environment, but clean them up for production
  const errorDetails = {
    message: err.message,
    url: req.url,
    method: req.method,
    ...(NODE_ENV !== 'production' && { stack: err.stack })
  };
  console.error('Error:', errorDetails);
  
  res.status(500).json({
    message: 'Something went wrong!',
    error: NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// Set up the routes
app.use('/api/games', RAWGGamesRouter);
app.use('/api/userGames', userGames);
app.use('/api/accounts', accountRouter);
app.use('/api/anime', animeRouter);
app.use('/api/userAnimes', userAnime);
app.use('/api/profile', profileRouter);
app.use('/api/cron', cronRouter);
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
    await prisma.$connect();
    
    app.listen(PORT, () => {
      console.log(`Server started in ${NODE_ENV} mode on port ${PORT}`);
      
      // Only log detailed env info in development
      if (NODE_ENV !== 'production') {
        console.log('Environment:', {
          NODE_ENV,
          PORT,
          DB_HOST: process.env.DB_HOST,
          DB_NAME: process.env.DB_NAME
        });
      }
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();