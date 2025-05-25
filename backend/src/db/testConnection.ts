import pool from '../config/database';

async function testDatabaseConnection() {
  try {
    // Test basic connection
    const client = await pool.connect();
    console.log('Successfully connected to PostgreSQL database');

    // Test table creation
    const result = await client.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'games'
      );
    `);
    
    console.log('Games table exists:', result.rows[0].exists);

    // Test inserting a sample game
    const sampleGame = {
      slug: 'test-game',
      name: 'Test Game',
      released: '2024-01-01',
      tba: false,
      background_image: 'https://example.com/image.jpg',
      rating: 4.5,
      rating_top: 5,
      ratings_count: 100,
      reviews_text_count: 50,
      added: 1000,
      metacritic: 85,
      playtime: 20,
      suggestions_count: 10,
      updated: '2024-01-01',
      user_game: 0,
      reviews_count: 50,
      saturated_color: '#000000',
      dominant_color: '#ffffff',
      esrb_rating: 'E',
      description_raw: 'A test game description'
    };

    const insertResult = await client.query(`
      INSERT INTO games (
        slug, name, released, tba, background_image, rating,
        rating_top, ratings_count, reviews_text_count, added,
        metacritic, playtime, suggestions_count, updated,
        user_game, reviews_count, saturated_color, dominant_color,
        esrb_rating, description_raw
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20)
      RETURNING id, name;
    `, [
      sampleGame.slug, sampleGame.name, sampleGame.released, sampleGame.tba,
      sampleGame.background_image, sampleGame.rating, sampleGame.rating_top,
      sampleGame.ratings_count, sampleGame.reviews_text_count, sampleGame.added,
      sampleGame.metacritic, sampleGame.playtime, sampleGame.suggestions_count,
      sampleGame.updated, sampleGame.user_game, sampleGame.reviews_count,
      sampleGame.saturated_color, sampleGame.dominant_color, sampleGame.esrb_rating,
      sampleGame.description_raw
    ]);

    console.log('Successfully inserted test game:', insertResult.rows[0]);

    // Test retrieving the game
    const retrieveResult = await client.query('SELECT * FROM games WHERE slug = $1', ['test-game']);
    console.log('Retrieved test game:', retrieveResult.rows[0]);

    // Clean up - remove test game
    await client.query('DELETE FROM games WHERE slug = $1', ['test-game']);
    console.log('Cleaned up test data');

    client.release();
    console.log('Database test completed successfully');
  } catch (error) {
    console.error('Error testing database:', error);
    throw error;
  } finally {
    // Close the pool
    await pool.end();
  }
}

// Run the test
testDatabaseConnection()
  .then(() => {
    console.log('All tests passed!');
    process.exit(0);
  })
  .catch((error: unknown) => {
    console.error('Test failed:', error);
    process.exit(1);
  }); 