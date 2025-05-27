import pool from '../config/database';
import fs from 'fs';
import path from 'path';

// file to change already defined tables in the database
async function runMigration() {
  try {
    const migrationPath = path.join(__dirname, 'migrations', 'update_rating_to_decimal.sql');
    const migrationSQL = fs.readFileSync(migrationPath, 'utf8');

    await pool.query(migrationSQL);
    console.log('Migration completed successfully');
  } catch (error) {
    console.error('Error running migration:', error);
    throw error;
  } finally {
    await pool.end();
  }
}


if (require.main === module) {
  runMigration()
    .then(() => {
      console.log('Migration completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Migration failed:', error);
      process.exit(1);
    });
}

export default runMigration; 