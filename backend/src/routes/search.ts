import express, { Request, Response } from 'express';
import { initDatabase } from '../database/database';
import { Database } from 'sqlite3';

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
    const sql = `
      SELECT * 
      FROM games 
      WHERE name LIKE '%' || ? || '%'
      LIMIT 10;
    `;

    db.all(sql, [query], (err: Error | null, rows: Game[]) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Database error' });
        return;
      }

      res.json({ games: rows });
    });
  } catch (error) {
    console.error('Error handling request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router; 