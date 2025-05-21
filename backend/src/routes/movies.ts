// movies.ts will be used to implement movie side of app

import { Router, Request, Response } from 'express';
import { getPopularMovies } from '../services/movieService';

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
}

const router = Router();

router.get('/movies', async (req: Request, res: Response) => {
  try {
    const movies: Movie[] = await getPopularMovies();
    res.json(movies);
  } catch (error) {
    console.error('Error fetching movies:', error);
    res.status(500).json({ error: 'Error fetching movies' });
  }
});

export default router; 