import express, { Request, Response } from 'express';
import { initDatabase } from "../database/database";

interface UserGame {
  game_id: number;
  user_rating: number | null;
  user_status: string | null;
}

interface Game {
  id: number;
  [key: string]: any; // For other game properties
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

const router = express.Router();
let db: any; // Using any temporarily to resolve the type issue

// Initialize database connection
initDatabase().then((database) => {
  db = database;
}).catch((error) => {
  console.error('Failed to initialize database:', error);
});

// Get games for a specific user by their ID (protected route)
router.get('/:userId/games', async (req: Request, res: Response) => {
  const { userId } = req.params;
  console.log("Request to /api/userGames/:userId/games");
  console.log("User ID from params:", userId);

  if (!db) {
    return res.status(500).json({ message: 'Database not initialized' });
  }

  try {
    const userGames = db.prepare('SELECT game_id, rating AS user_rating, status AS user_status FROM user_games WHERE user_id = ?').all(userId) as UserGame[];
    console.log("User's games:", userGames);

    if (!userGames || userGames.length === 0) {
      return res.json([]);
    }

    const gameIds = userGames.map((game: UserGame) => game.game_id);
    console.log("Game IDs:", gameIds);

    const games = db.prepare('SELECT * FROM games WHERE id IN (' + gameIds.map(() => '?').join(', ') + ')').all(...gameIds) as Game[];
    console.log("Game details:", games);

    const combinedGames = games.map((game: Game) => {
      const userGame = userGames.find((ug: UserGame) => ug.game_id === game.id);
      return {
        ...game,
        user_rating: userGame?.user_rating || null,
        user_status: userGame?.user_status || null,
      };
    });

    res.status(200).json(combinedGames);
  } catch (error) {
    console.error('Error retrieving games for user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Post route for submitting ratings
router.post('/ratings', (req: Request<{}, {}, RatingRequest>, res: Response) => {
  const { username, gameId, rating, status } = req.body;
  console.log("Request to /api/ratings");

  if (!db) {
    return res.status(500).json({ message: 'Database not initialized' });
  }

  try {
    const userRow = db.prepare('SELECT id FROM users WHERE username = ?').get(username) as UserRow;
    if (!userRow) {
      return res.status(404).json({ message: 'User not found' });
    }

    const userId = userRow.id;
    const existingRating = db.prepare('SELECT * FROM user_games WHERE user_id = ? AND game_id = ?').get(userId, gameId);

    if (existingRating) {
      db.prepare(`
        UPDATE user_games
        SET rating = ?, status = ?
        WHERE user_id = ? AND game_id = ?
      `).run(rating, status, userId, gameId);
      res.status(200).json({ message: 'Rating updated successfully' });
    } else {
      db.prepare(`
        INSERT INTO user_games (user_id, game_id, rating, status)
        VALUES (?, ?, ?, ?)
      `).run(userId, gameId, rating, status);
      res.status(200).json({ message: 'Rating submitted successfully' });
    }
  } catch (error) {
    console.error('Error handling rating:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router; 