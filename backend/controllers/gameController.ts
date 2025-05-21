import pool from '../src/config/database';
import {Request, Response} from 'express'

// Get all games with pagination and sorting
export const getGames = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 20, sortField = 'name', sortOrder = 'asc' } = req.query;

    const validSortFields = ['name', 'updated'];
    const validSortOrders = ['asc', 'desc'];

    if (!validSortFields.includes(sortField as string) || !validSortOrders.includes((sortOrder as string).toLowerCase())) {
      return res.status(400).json({ error: 'Invalid sort parameters' });
    }

    const offset = (Number(page) - 1) * Number(limit);

    const query = `
      SELECT * FROM games 
      ORDER BY ${sortField} ${(sortOrder as String).toUpperCase()} 
      LIMIT $1 OFFSET $2
    `;
    
    const result = await pool.query(query, [limit, offset]);
    res.status(200).json({ games: result.rows });
  } catch (error) {
    console.error('Error fetching games:', error);
    res.status(500).json({ error: 'Failed to fetch games' });
  }
};

// Get game by ID
export const getGameByID = async (req: Request, res:Response) => {
  try {
    const id = Number(req.params.id);
    
    if (isNaN(id) || id <= 0) {
      return res.status(400).json({ error: 'Invalid game ID' });
    }

    const result = await pool.query('SELECT * FROM games WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Game not found' });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching game:', error);
    res.status(500).json({ error: 'Failed to fetch game' });
  }
};

// Get recently updated games
export const getGameByUpdateDate = async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      'SELECT id, name, background_image FROM games ORDER BY released DESC LIMIT 100'
    );
    
    res.status(200).json({ games: result.rows });
  } catch (error) {
    console.error('Error fetching games by release date:', error);
    res.status(500).json({ error: 'Failed to fetch recently released games' });
  }
}; 