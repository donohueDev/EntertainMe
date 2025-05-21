import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import RAWGGamesRouter from './routes/games';
import { accountRouter } from './routes/accounts';
import userGamesRoute from './routes/userGames';
import top100GamesRouter from './routes/top100Games';
// import animeRouter from '../routes/anime';
// import searchRouter from '../routes/search';
// import moviesRouter from '../routes/movies';
// import showsRouter from '../routes/shows';
// import protectedRoute from '../routes/protectedRoute';
import { initDatabase } from './database/database';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Configure CORS
const corsOptions = {
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000', 'http://localhost:5173', 'http://localhost:3001'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: false, // Set to true if you want to pass cookies
};

// Enable CORS with options
app.use(cors(corsOptions));

// Middleware
app.use(express.json());

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

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Entertainment API' });
});

// Initialize database when app starts
initDatabase()
  .then(() => {
    console.log('Database initialized successfully');
    // Start your server here
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Failed to initialize database:', error);
    process.exit(1);
  }); 