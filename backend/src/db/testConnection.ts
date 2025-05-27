// import { PrismaClient } from '@prisma/client';

// console.log('Starting Prisma initialization...');
// const prisma = new PrismaClient({
//   log: ['query', 'info', 'warn', 'error'],
// });
// console.log('Prisma initialized successfully');

// async function testDatabaseConnection() {
//   try {
//     // Test basic connection
//     await prisma.$connect();
//     console.log('Successfully connected to the database');

//     // Test if the `games` table exists by querying for any records
//     const gamesCount = await prisma.game.count();
//     console.log('Games table exists, record count:', gamesCount);

//     // Test inserting a sample game
//     const sampleGame = await prisma.game.create({
//       data: {
//         slug: 'test-game',
//         name: 'Test Game',
//         released: '2024-01-01',
//         tba: false,
//         background_image: 'https://example.com/image.jpg',
//         rating: 4.5,
//         rating_top: 5,
//         ratings_count: 100,
//         reviews_text_count: 50,
//         added: 1000,
//         metacritic: 85,
//         playtime: 20,
//         suggestions_count: 10,
//         updated: '2024-01-01',
//         user_game: 1,
//         reviews_count: 50,
//         saturated_color: '#000000',
//         dominant_color: '#ffffff',
//         esrb_rating: 'E',
//         description_raw: 'A test game description',
//       },
//     });
//     console.log('Successfully inserted test game:', sampleGame);

//     // Test retrieving the game
//     const retrievedGame = await prisma.game.findUnique({
//       where: { id: sampleGame.id },
//     });
//     console.log('Retrieved test game:', retrievedGame);

//     // Clean up - remove test game
//     await prisma.game.delete({
//       where: { id: sampleGame.id },
//     });
//     console.log('Cleaned up test data for game');

//     // Test if the `anime` table exists by querying for any records
//     const animeCount = await prisma.anime.count();
//     console.log('Anime table exists, record count:', animeCount);

//     // Test inserting a sample anime
//     const sampleAnime = await prisma.anime.create({
//       data: {
//         mal_id: 1,
//         slug: 'test-anime',
//         title: 'Test Anime',
//         title_english: 'Test Anime English',
//         title_japanese: 'テストアニメ',
//         synopsis: 'This is a test anime synopsis.',
//         background: 'This is a raw description of the test anime.',
//         image_url: 'https://example.com/anime.jpg',
//         trailer_url: 'https://example.com/trailer.mp4',
//         url: 'https://example.com/anime', // Added required url property
//         type: 'TV',
//         source: 'Manga',
//         episodes: 12,
//         status: 'Finished Airing',
//         airing: false,
//         aired_from: new Date('2024-01-01'),
//         aired_to: new Date('2024-03-31'),
//         duration: '24 min',
//         rating: 'PG-13',
//         score: 8.5,
//         scored_by: 1000,
//         rank: 1,
//         popularity: 100,
//         members: 5000,
//         favorites: 100,
//         season: 'Winter',
//         year: 2024,
//         approved: true,
//         broadcast_day: 'Monday',
//         broadcast_time: '18:00',
//         broadcast_timezone: 'JST',
//         broadcast_string: 'Mondays at 18:00 (JST)',
//       },
//     });
//     console.log('Successfully inserted test anime:', sampleAnime);

//     // Test retrieving the anime
//     const retrievedAnime = await prisma.anime.findUnique({
//       where: { mal_id: 1 },
//     });
//     console.log('Retrieved test anime:', retrievedAnime);

//     // Clean up - remove test anime
//     await prisma.anime.delete({
//       where: { mal_id: 1 },
//     });
//     console.log('Cleaned up test data for anime');
//   } catch (error) {
//     console.error('Error testing database:', error);
//     throw error;
//   } finally {
//     // Disconnect Prisma Client
//     await prisma.$disconnect();
//   }
// }

// // Run the test
// testDatabaseConnection()
//   .then(() => {
//     console.log('All tests passed!');
//     process.exit(0);
//   })
//   .catch((error: unknown) => {
//     console.error('Test failed:', error);
//     process.exit(1);
//   });