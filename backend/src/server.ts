import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import RAWGGamesRouter from './routes/games';
import { accountRouter } from './routes/accounts';
import userGamesRoute from './routes/userGames';
import top100GamesRouter from './routes/top100Games';
// import animeRouter from '../routes/anime';
// import searchRouter from '../routes/search';
// import moviesRouter from '../routes/movies';
// import showsRouter from '../routes/shows';
// import protectedRoute from '../routes/protectedRoute';
import initializeDatabase from './db/init';

// Load environment variables from root directory
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const app = express();
const PORT = process.env.PORT || 5001;
const NODE_ENV = process.env.NODE_ENV || 'development';

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
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
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
app.use('/api/top100games', top100GamesRouter);
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
    version: process.env.npm_package_version || '1.0.0'
  });
});

// Initialize database and start server
initializeDatabase()
  .then(() => {
    console.log('Database initialized successfully');
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
  })
  .catch((error) => {
    console.error('Failed to initialize database:', error);
    process.exit(1);
  }); 