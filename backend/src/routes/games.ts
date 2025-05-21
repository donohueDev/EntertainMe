import express, { Request, Response } from 'express';
import axios from 'axios';
import pool from '../config/database';

const router = express.Router();

interface Game {
  id: number;
  slug: string;
  name: string;
  released?: string;
  tba?: boolean;
  background_image?: string;
  rating?: number;
  rating_top?: number;
  ratings_count?: number;
  reviews_text_count?: number;
  added?: number;
  metacritic?: number;
  playtime?: number;
  suggestions_count?: number;
  updated?: string;
  user_game?: boolean;
  reviews_count?: number;
  saturated_color?: string;
  dominant_color?: string;
  esrb_rating?: { name: string };
  description_raw?: string;
  description?: string;
}

// Function to process and insert game data into the database
const processGameData = async (game: Game): Promise<void> => {
  try {
    // Check if the required properties exist on the game object
    if (!game || !game.id || !game.slug || !game.name) {
      console.error('Skipping invalid game data:', game);
      return;
    }

    // Fetch detailed game information
    const { data: detailedGame } = await axios.get<Game>(`https://api.rawg.io/api/games/${game.id}`, {
      params: { key: process.env.RAWG_API_KEY }
    });

    // Check if the game already exists in the database
    const existingGameResult = await pool.query('SELECT id FROM games WHERE id = $1', [game.id]);
    
    // If the game already exists, skip the insertion
    if (existingGameResult.rows.length > 0) {
      console.log(`Game with ID ${game.id} already exists in the database.`);
      return;
    }

    // Insert the game data
    await pool.query(`
      INSERT INTO games (
        id, slug, name, released, tba, background_image, rating, rating_top, ratings_count,
        reviews_text_count, added, metacritic, playtime, suggestions_count,
        updated, user_game, reviews_count, saturated_color, dominant_color, esrb_rating, description_raw
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21)
    `, [
      detailedGame.id,
      detailedGame.slug,
      detailedGame.name,
      detailedGame.released,
      detailedGame.tba,
      detailedGame.background_image,
      detailedGame.rating,
      detailedGame.rating_top,
      detailedGame.ratings_count,
      detailedGame.reviews_text_count,
      detailedGame.added,
      detailedGame.metacritic,
      detailedGame.playtime,
      detailedGame.suggestions_count,
      detailedGame.updated,
      detailedGame.user_game,
      detailedGame.reviews_count,
      detailedGame.saturated_color,
      detailedGame.dominant_color,
      detailedGame.esrb_rating ? detailedGame.esrb_rating.name : null,
      detailedGame.description_raw || detailedGame.description
    ]);

    console.log(`Successfully inserted game ${detailedGame.name}`);
  } catch (error) {
    console.error('Error processing game data:', error);
    throw error;
  }
};

// POST request to fetch and insert games from the RAWG API
router.post('/rawg-games', async (_req: Request, res: Response) => {
  try {
    let page = 1;
    const pageSize = 100;
    let totalGamesInserted = 0;
    const targetGames = 10;

    while (totalGamesInserted < targetGames) {
      const { data } = await axios.get<{ results: Game[] }>('https://api.rawg.io/api/games', {
        params: { key: process.env.RAWG_API_KEY, page, page_size: pageSize },
      });

      const games = data.results;
      if (!games.length) break;

      // Process games sequentially instead of concurrently
      for (const game of games) {
        if (totalGamesInserted >= targetGames) break;
        
        try {
          await processGameData(game);
          totalGamesInserted++;
          console.log(`Inserted ${totalGamesInserted} games so far.`);
        } catch (err) {
          console.error(`Failed to insert game ${game.id}:`, err instanceof Error ? err.message : 'Unknown error');
        }
      }

      if (totalGamesInserted >= targetGames) {
        break;
      }

      page++;
    }

    res.status(200).json({ message: `Successfully inserted ${totalGamesInserted} games!` });
  } catch (error) {
    console.error('Error fetching or inserting games:', error);
    res.status(500).json({ error: 'Failed to fetch games' });
  }
});

// GET all games
router.get('/', async (_req: Request, res: Response) => {
  try {
    const sql = 'SELECT * FROM games ORDER BY rating DESC;';
    
    pool.query(sql, [], (err: Error | null, result) => {
      if (err) {
        console.error('Error fetching games:', err);
        res.status(500).json({ error: 'Database error' });
        return;
      }
      console.log('Found games:', result.rows.length);
      res.json(result.rows);
    });
  } catch (error) {
    console.error('Error handling request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Test route to check database connection
router.get('/test', (_req: Request, res: Response) => {
  try {
    pool.query('SELECT COUNT(*) as count FROM games', [], (err: Error | null, result) => {
      if (err) {
        console.error('Error checking games count:', err);
        res.status(500).json({ error: 'Database error' });
        return;
      }
      res.json({ message: 'Database is working', gamesCount: result.rowCount });
    });
  } catch (error) {
    console.error('Error in test route:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router; 