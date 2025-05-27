import { Request, Response } from 'express';
import pool from "../config/database";

interface UserGame {
  game_id: number;
  user_rating: number | null;
  user_status: string | null;
}

interface Game {
  id: number;
  [key: string]: unknown; // For other game properties
}

interface RatingRequest {
  username: string;
  gameId: number;
  rating: number;
  status: string;
}

interface UserRow {
  id: number;
}

export const userGamesController = {
  // Get games for a specific user by their ID
  getUserGames: async (req: Request, res: Response) => {
    const { userId } = req.params;
    console.log("Request to /api/userGames/:userId/games");
    console.log("User ID from params:", userId);

    try {
      // Get user's games with their ratings and status
      const userGamesResult = await pool.query(
        'SELECT game_id, rating AS user_rating, status AS user_status FROM user_games WHERE user_id = $1',
        [userId]
      );
      const userGames = userGamesResult.rows as UserGame[];
      console.log("User's games:", userGames);

      if (!userGames || userGames.length === 0) {
        return res.json([]);
      }

      const gameIds = userGames.map((game: UserGame) => game.game_id);
      console.log("Game IDs:", gameIds);

      // Get game details for all user's games
      const gamesResult = await pool.query(
        'SELECT * FROM games WHERE id = ANY($1)',
        [gameIds]
      );
      const games = gamesResult.rows as Game[];
      console.log("Game details:", games);

      const combinedGames = games.map((game: Game) => {
        const userGame = userGames.find((ug: UserGame) => ug.game_id === game.id);
        return {
          ...game,
          user_rating: userGame?.user_rating ?? null,
          user_status: userGame?.user_status ?? null,
        };
      });

      res.status(200).json(combinedGames);
    } catch (error) {
      console.error('Error retrieving games for user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Submit or update a rating
  submitRating: async (req: Request<object, {}, RatingRequest>, res: Response) => {
    const { username, gameId, rating, status } = req.body;
    console.log("Request to /api/ratings");

    try {
      // Get user ID from username
      const userResult = await pool.query('SELECT id FROM users WHERE username = $1', [username]);
      const userRow = userResult.rows[0] as UserRow;
      
      if (!userRow) {
        return res.status(404).json({ message: 'User not found' });
      }

      const userId = userRow.id;

      // Check if rating exists
      const existingRatingResult = await pool.query(
        'SELECT * FROM user_games WHERE user_id = $1 AND game_id = $2',
        [userId, gameId]
      );
      const existingRating = existingRatingResult.rows[0];

      if (existingRating) {
        // Update existing rating
        await pool.query(
          `UPDATE user_games
           SET rating = $1, status = $2
           WHERE user_id = $3 AND game_id = $4`,
          [rating, status, userId, gameId]
        );
        res.status(200).json({ message: 'Rating updated successfully' });
      } else {
        // Insert new rating
        await pool.query(
          `INSERT INTO user_games (user_id, game_id, rating, status)
           VALUES ($1, $2, $3, $4)`,
          [userId, gameId, rating, status]
        );
        res.status(200).json({ message: 'Rating submitted successfully' });
      }
    } catch (error) {
      console.error('Error handling rating:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Get a specific game's data for a user
  getUserGame: async (req: Request, res: Response) => {
    const { userId, gameId } = req.params;
    console.log("Request to /api/userGames/:userId/games/:gameId");
    console.log("User ID:", userId, "Game ID:", gameId);

    try {
      // Get user's game data
      const result = await pool.query(
        'SELECT rating AS user_rating, status AS user_status FROM user_games WHERE user_id = $1 AND game_id = $2',
        [userId, gameId]
      );

      if (result.rows.length === 0) {
        return res.json({ user_rating: null, user_status: null });
      }

      res.status(200).json(result.rows[0]);
    } catch (error) {
      console.error('Error retrieving game data for user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Delete a game from user's collection
  deleteUserGame: async (req: Request, res: Response) => {
    const { userId, gameId } = req.params;
    console.log("Request to delete game from user's collection:", { userId, gameId });

    try {
      const result = await pool.query(
        'DELETE FROM user_games WHERE user_id = $1 AND game_id = $2 RETURNING *',
        [userId, gameId]
      );

      if (result.rowCount === 0) {
        return res.status(404).json({ message: 'Game not found in user collection' });
      }

      res.status(200).json({ message: 'Game removed from collection successfully' });
    } catch (error) {
      console.error('Error removing game from collection:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};
