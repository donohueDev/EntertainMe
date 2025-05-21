import { Pool, PoolClient } from 'pg';
import dotenv from 'dotenv';

dotenv.config({ path: '/Users/donohue/tempProject/.env' });
console.log('DB_USER:', process.env.DB_USER);
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'entertainme',
  password: process.env.DB_PASSWORD || 'postgres',
  port: parseInt(process.env.DB_PORT || '5432'),
});

// Test the connection
pool.connect((err: Error | undefined, client: PoolClient | undefined, done: (release?: any) => void) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Successfully connected to PostgreSQL database');
  done();
});

export default pool; 