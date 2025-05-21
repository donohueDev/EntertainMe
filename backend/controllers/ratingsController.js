// implemented ratings routes directly in userGames just to keep things simple
// might make things complicated later but its fine for now 
// // ratingsController.js
// import { open } from 'sqlite';
// import sqlite3 from 'sqlite3';

// const dbPromise = open({
//   filename: './database/entertainme.db',
//   driver: sqlite3.Database
// });

// export const addRating = async (req, res) => {
//   const { gameId, rating, userId } = req.body;

//   try {
//     const db = await dbPromise;
    
//     // Insert the rating into the database
//     await db.run(
//       'INSERT INTO user_games (game_id, rating, user_id) VALUES (?, ?, ?)',
//       [gameId, rating, userId]
//     );

//     res.status(201).json({ message: 'Rating added successfully' });
//   } catch (error) {
//     console.error('Error adding rating:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };

// export const getRatingsForGame = async (req, res) => {
//   const { gameId } = req.params;

//   try {
//     const db = await dbPromise;

//     // Fetch ratings for a specific game
//     const ratings = await db.all('SELECT * FROM ratings WHERE game_id = ?', [gameId]);

//     if (ratings.length === 0) {
//       return res.status(404).json({ message: 'No ratings found for this game' });
//     }

//     res.json({ ratings });
//   } catch (error) {
//     console.error('Error fetching ratings:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };
