import { Pool, PoolClient } from 'pg';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from root directory
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

// Parse DATABASE_URL if it exists (for production)
let dbConfig;
if (process.env.DATABASE_URL) {
  // Parse the DATABASE_URL
  const url = new URL(process.env.DATABASE_URL);
  dbConfig = {
    user: url.username,
    password: url.password,
    host: url.hostname,
    port: parseInt(url.port),
    database: url.pathname.substring(1),
    ssl: {
      rejectUnauthorized: false // Required for Render's PostgreSQL
    }
  };
} else {
  // Local development configuration
  dbConfig = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || '5432'),
  };
}

// Debug environment variables (without sensitive data)
console.log('Database Configuration:', {
  user: dbConfig.user,
  host: dbConfig.host,
  database: dbConfig.database,
  port: dbConfig.port,
  ssl: dbConfig.ssl ? 'enabled' : 'disabled'
});

const pool = new Pool(dbConfig);

// Test the connection
pool.connect((err: Error | undefined, client: PoolClient | undefined, done: (release?: any) => void) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    console.error('Connection details:', {
      user: dbConfig.user,
      host: dbConfig.host,
      database: dbConfig.database,
      port: dbConfig.port
    });
    return;
  }
  console.log('Successfully connected to PostgreSQL database');
  done();
});

// Add error handler for the pool
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

export default pool; 