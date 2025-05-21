//gameController.js file used to retrieve games from database with different filters
import { initDatabase, getDatabase } from "../database/database.js";

//initialize database in order to create db variable
let db;
initDatabase().then((database) => {
  db = database;
  console.log('Database initialized successfully');
}).catch((err) => {
  console.error('Failed to initialize database:', err);
});

// export getGames function for other modules to use
// take in http req and send back res to client which contains all games in db
export const getGames = (req, res) => {
  try {
    const database = getDatabase();
    
    // Extract query params with default values - only inserted 20 games into app
    const { page = 1, limit = 20, sortField = 'name', sortOrder = 'asc' } = req.query;

    // Validate query params
    const validSortFields = ['name', 'updated']; // allowable entries for sort fields
    const validSortOrders = ['asc', 'desc']; // allowable entries for sort orders

    // check to make sure sort field/orders are correct
    if (!validSortFields.includes(sortField) || !validSortOrders.includes(sortOrder.toLowerCase())) {
      return res.status(400).json({ error: 'Invalid sort parameters' });
    }

    // offset for querying large db - not needed for now
    const offset = (page - 1) * limit;

    // Prepare query to fetch games with safe parameters
    const query = `
      SELECT * FROM games 
      ORDER BY ${sortField} ${sortOrder.toUpperCase()} 
      LIMIT ? OFFSET ?
    `;
    
    // Fetch games from the database using limit/offset to fill query
    database.all(query, [limit, offset], (err, rows) => {
      if (err) {
        console.error('Error fetching games:', err);
        return res.status(500).json({ error: 'Failed to fetch games' });
      }

      // Return the games as JSON
      res.status(200).json({ games: rows });
    });
  } catch (error) {
    console.error('Error fetching games:', error);
    res.status(500).json({ error: 'Failed to fetch games' });
  }
};

// similar to function above but allows us to retrieve games by ID
export const getGameByID = (req, res) => {
  try {
    const database = getDatabase();
    
    // Validate the ID parameter
    const id = Number(req.params.id);
    // ID must be a number and >= 0
    if (isNaN(id) || id <= 0) {
      return res.status(400).json({ error: 'Invalid game ID' });
    }

    // Fetch the game by ID directly using db.get()
    database.get('SELECT * FROM games WHERE id = ?', [id], (err, game) => {
      if (err) {
        console.error('Error fetching game:', err);
        return res.status(500).json({ error: 'Failed to fetch game' });
      }

      // Check if the game was found
      if (!game) {
        return res.status(404).json({ error: 'Game not found' });
      }

      // Return the game data
      res.status(200).json(game);
    });
  } catch (error) {
    console.error('Error fetching game:', error);
    res.status(500).json({ error: 'Failed to fetch game' });
  }
};

// another get function to fill home page with most recently released games in db
export const getGameByUpdateDate = (req, res) => {
  try {
    const database = getDatabase();
    
    // Fetch the top 100 most recently updated games
    database.all('SELECT id, name, background_image FROM games ORDER BY released DESC LIMIT 100', [], (err, games) => {
      if (err) {
        console.error('Error fetching games by release date:', err);
        return res.status(500).json({ error: 'Failed to fetch recently released games' });
      }

      // Return the games data
      res.status(200).json({ games });
    });
  } catch (error) {
    console.error('Error fetching games by release date:', error);
    res.status(500).json({ error: 'Failed to fetch recently released games' });
  }
};
