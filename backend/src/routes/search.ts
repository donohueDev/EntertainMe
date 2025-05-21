import express, { Request, Response } from 'express';
import pool from '../config/database';


interface SearchQuery {
  query?: string;
}

interface Game {
  id: number;
  name: string;
  slug: string;
  released: string;
  tba: number;
  background_image: string;
  rating: number;
  rating_top: number;
  ratings_count: number;
  reviews_text_count: number;
  added: number;
  metacritic: number;
  playtime: number;
  suggestions_count: number;
  updated: string;
  
}

interface DatabaseError extends Error {
  code?: string;
}

const router = express.Router();

router.get('/game', async (req: Request<{}, {}, {}, SearchQuery>, res: Response) => {
  const { query } = req.query;

  try {
    const result = await pool.query(
      `SELECT * 
       FROM games 
       WHERE name ILIKE $1
       LIMIT 10`,
      [`%${query}%`]
    );

    res.json({ games: result.rows });
  } catch (error) {
    console.error('Error handling request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router; 