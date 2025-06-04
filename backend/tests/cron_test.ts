import axios from 'axios';
import dotenv from 'dotenv';
import path from 'path';
import { PrismaClient } from '@prisma/client';

// Load environment variables from root directory
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const prisma = new PrismaClient();
const API_BASE_URL = process.env.NODE_ENV === 'production' 
    ? 'https://entertainment-reviews-api.onrender.com'
    : 'http://localhost:5001';

async function testCronJob() {
    try {
        console.log('Testing cron job on:', API_BASE_URL);

        // Store initial counts
        const initialGamesCount = await prisma.top50Games.count();
        const initialAnimeCount = await prisma.top50Anime.count();
        
        console.log(`Initial counts - Games: ${initialGamesCount}, Anime: ${initialAnimeCount}`);

        // Call the cron endpoint
        const response = await axios.get(`${API_BASE_URL}/api/cron`, {
            headers: {
                'Authorization': `Bearer ${process.env.CRON_SECRET}`
            }
        });
        
        console.log('Cron endpoint response:', response.data);

        // Wait a few seconds for any async operations to complete
        await new Promise(resolve => setTimeout(resolve, 5000));

        // Get final counts
        const finalGamesCount = await prisma.top50Games.count();
        const finalAnimeCount = await prisma.top50Anime.count();

        console.log(`\nFinal counts - Games: ${finalGamesCount}, Anime: ${finalAnimeCount}`);

        // Verify the updates
        console.log('\nVerification Results:');
        console.log('===================');
        console.log(`Games updated: ${finalGamesCount > 0 ? '✅' : '❌'}`);
        console.log(`Anime updated: ${finalAnimeCount > 0 ? '✅' : '❌'}`);

        if (finalGamesCount === 0 || finalAnimeCount === 0) {
            throw new Error('One or both content types failed to update');
        }

        console.log('\nTest completed successfully! ✅');

    } catch (error: any) {
        console.error('Test failed:', error.response?.data || error.message);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}

// Only run if called directly
if (require.main === module) {
    testCronJob()
        .then(() => process.exit(0))
        .catch(() => process.exit(1));
}

export default testCronJob;
