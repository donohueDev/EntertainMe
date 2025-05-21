import express, { Request, Response } from 'express';
import pool from '../config/database';


interface SearchQuery {
  query?: string;
}

interface Game {
  id: number;
  name: string;
  // Add other game properties as needed
}

interface DatabaseError extends Error {
  code?: string;
}

const router = express.Router();
let db: Database;

// Initialize database connection
initDatabase().then((database: Database) => {
  db = database;
}).catch((error: DatabaseError) => {
  console.error('Failed to initialize database:', error);
});

router.get('/game', async (req: Request<{}, {}, {}, SearchQuery>, res: Response) => {
  const { query } = req.query;

  if (!db) {
    res.status(500).json({ error: 'Database not initialized' });
    return;
  }

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