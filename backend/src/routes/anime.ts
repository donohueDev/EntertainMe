import express, { Request, Response } from 'express';
import { initDatabase } from '../../../database/database';
import { Database } from 'sqlite3';

interface Anime {
  id: number;
  title_romaji: string;
  title_english: string | null;
  title_native: string | null;
  title_user_preferred: string | null;
  description: string | null;
  format: string | null;
  status: string | null;
  start_date: string | null;
  end_date: string | null;
  episodes: number | null;
  duration: number | null;
  source: string | null;
  popularity: number | null;
  average_score: number | null;
  mean_score: number | null;
  favourites: number | null;
  cover_image: string | null;
  banner_image: string | null;
  genres: string | null;
  studios: string | null;
  created_at: string;
}

const router = express.Router();
let db: Database;

// Initialize database connection
initDatabase().then((database) => {
  db = database;
}).catch((error) => {
  console.error('Failed to initialize database:', error);
});

// Get all anime
router.get('/', async (req: Request, res: Response) => {
  if (!db) {
    res.status(500).json({ error: 'Database not initialized' });
    return;
  }

  try {
    const sql = 'SELECT * FROM animes ORDER BY created_at DESC;';
    db.all(sql, [], (err, rows: Anime[]) => {
      if (err) {
        console.error('Error fetching anime:', err);
        res.status(500).json({ error: 'Database error' });
        return;
      }
      res.json(rows);
    });
  } catch (error) {
    console.error('Error handling request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router; 