import pool from '../config/database';

async function initializeDatabase() {
  try {
    // Create games table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS games (
        id SERIAL PRIMARY KEY,
        slug TEXT NOT NULL,
        name TEXT NOT NULL,
        released TEXT,
        tba BOOLEAN,
        background_image TEXT,
        rating DECIMAL,
        rating_top INTEGER,
        ratings_count INTEGER,
        reviews_text_count INTEGER,
        added INTEGER,
        metacritic INTEGER,
        playtime INTEGER,
        suggestions_count INTEGER,
        updated TEXT,
        user_game INTEGER,
        reviews_count INTEGER,
        saturated_color TEXT,
        dominant_color TEXT,
        esrb_rating TEXT,
        description_raw TEXT
      )
    `);

    // Create users table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create user_games table for user ratings and status
    await pool.query(`
      CREATE TABLE IF NOT EXISTS user_games (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        game_id INTEGER REFERENCES games(id),
        rating INTEGER,
        status TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(user_id, game_id)
      )
    `);

    // Create top_100_games table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS top_100_games (
        id SERIAL PRIMARY KEY,
        game_id INTEGER REFERENCES games(id),
        rank INTEGER NOT NULL,
        value DECIMAL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(rank)
      )
    `);

    console.log('Database tables created successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  } finally {
    // Close the pool
    await pool.end();
  }
}

// Run the initialization if this file is called directly
if (require.main === module) {
  initializeDatabase()
    .then(() => {
      console.log('Database initialization completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Database initialization failed:', error);
      process.exit(1);
    });
}

export default initializeDatabase; 