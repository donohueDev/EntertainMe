import express, { Request, Response } from 'express';
import pool from '../config/database';

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
  user_game: number;
  reviews_count: number;
  saturated_color: string;
  dominant_color: string;
  esrb_rating: string;
  description_raw: string;
}

interface Top100Game {
  id: number;
  game_id: number;
  rank: number;
  value: number;
  created_at: string;
  game?: Game;
}

const router = express.Router();

// Get top 100 games
router.get('/', async (_req: Request, res: Response) => {
  try {
    const result = await pool.query(
      `SELECT t.*, g.*
       FROM top_100_games t
       JOIN games g ON t.game_id = g.id
       ORDER BY t.rank ASC
       LIMIT 100`
    );

    const top100Games: Top100Game[] = result.rows.map(row => ({
      id: row.id,
      game_id: row.game_id,
      rank: row.rank,
      value: row.value,
      created_at: row.created_at,
      game: {
        id: row.game_id,
        name: row.name,
        slug: row.slug,
        released: row.released,
        tba: row.tba,
        background_image: row.background_image,
        rating: row.rating,
        rating_top: row.rating_top,
        ratings_count: row.ratings_count,
        reviews_text_count: row.reviews_text_count,
        added: row.added,
        metacritic: row.metacritic,
        playtime: row.playtime,
        suggestions_count: row.suggestions_count,
        updated: row.updated,
        user_game: row.user_game,
        reviews_count: row.reviews_count,
        saturated_color: row.saturated_color,
        dominant_color: row.dominant_color,
        esrb_rating: row.esrb_rating,
        description_raw: row.description_raw
      }
    }));

    res.json(top100Games);
  } catch (error) {
    console.error('Error handling request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update top 100 games
router.post('/update', async (req: Request, res: Response) => {
  try {
    const { games } = req.body;
    if (!Array.isArray(games)) {
      return res.status(400).json({ error: 'Invalid request body' });
    }

    // Start a transaction
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      // Clear existing top 100 games
      await client.query('DELETE FROM top_100_games');

      // Insert new top 100 games
      for (let i = 0; i < games.length; i++) {
        const game = games[i];
        await client.query(
          'INSERT INTO top_100_games (game_id, rank, value) VALUES ($1, $2, $3)',
          [game.id, i + 1, game.value]
        );
      }

      await client.query('COMMIT');
      res.json({ message: 'Top 100 games updated successfully' });
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error handling request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router; 