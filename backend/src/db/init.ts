// This file is used to initialize the database schema for the application manually.
// I have since switched to using Prisma for database management, so this file is no longer needed.

// import pool from '../config/database';

// async function initializeDatabase() {
//   try {
//     // Create games table
//     await pool.query(`
//       model Anime {
//         mal_id             Int      @id
//         slug               String
//         url                String
//         title              String
//         title_english      String?
//         title_japanese     String?
//         synopsis           String?
//         background         String?
//         type               String?
//         source             String?
//         episodes           Int?
//         status             String?
//         airing             Boolean
//         aired_from         DateTime?
//         aired_to           DateTime?
//         duration           String?
//         rating             String?
//         score              Float?
//         scored_by          Int?
//         rank               Int?
//         popularity         Int?
//         members            Int?
//         favorites          Int?
//         season             String?
//         year               Int?
//         approved           Boolean
//         broadcast_day      String?
//         broadcast_time     String?
//         broadcast_timezone String?
//         broadcast_string   String?
//         trailer_url        String?
//         trailer_youtube_id String?
//         trailer_embed_url  String?
//         image_url          String?
//         image_large_url    String?
//         image_small_url    String?
//         updated_at         DateTime @default(now())
//       }
//     `);

//     // Create users table
//     await pool.query(`
//       CREATE TABLE IF NOT EXISTS users (
//         id SERIAL PRIMARY KEY,
//         email TEXT UNIQUE NOT NULL,
//         username TEXT UNIQUE NOT NULL,
//         password TEXT NOT NULL,
//         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//       )
//     `);

//     // Create user_games table for user ratings and status
//     await pool.query(`
//       CREATE TABLE IF NOT EXISTS user_games (
//         id SERIAL PRIMARY KEY,
//         user_id INTEGER REFERENCES users(id),
//         game_id INTEGER REFERENCES games(id),
//         rating DECIMAL(3,1),
//         status TEXT,
//         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//         UNIQUE(user_id, game_id)
//       )
//     `);

//     // Create top_100_games table
//     await pool.query(`
//       CREATE TABLE IF NOT EXISTS top_100_games (
//         id SERIAL PRIMARY KEY,
//         game_id INTEGER REFERENCES games(id),
//         rank INTEGER NOT NULL,
//         value DECIMAL,
//         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//         UNIQUE(rank)
//       )
//     `);

//     // Create anime table
//     await pool.query(`
//       CREATE TABLE IF NOT EXISTS anime (
//         id SERIAL PRIMARY KEY,
//         slug TEXT NOT NULL,
//         title TEXT NOT NULL,
//         title_english TEXT,
//         title_japanese TEXT,
//         synopsis TEXT,
//         description_raw TEXT,
//         image_url TEXT,
//         trailer_url TEXT,
//         type TEXT,
//         source TEXT,
//         episodes INTEGER,
//         status TEXT,
//         airing BOOLEAN,
//         aired JSONB,
//         duration TEXT,
//         rating TEXT,
//         score DECIMAL,
//         scored_by INTEGER,
//         rank INTEGER,
//         popularity INTEGER,
//         members INTEGER,
//         favorites INTEGER,
//         genres JSONB,
//         studios JSONB,
//         season TEXT,
//         year INTEGER,
//         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//       )
//     `);
//     console.log('Database tables created successfully');
//   } catch (error) {
//     console.error('Error initializing database:', error);
//     throw error;
//   }
// }

// // Run the initialization if this file is called directly
// if (require.main === module) {
//   initializeDatabase()
//     .then(() => {
//       console.log('Database initialization completed');
//       process.exit(0);
//     })
//     .catch((error: unknown) => {
//       console.error('Database initialization failed:', error);
//       process.exit(1);
//     });
// }

// export default initializeDatabase;