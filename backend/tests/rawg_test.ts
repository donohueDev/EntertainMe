import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const RAWG_API_KEY = process.env.RAWG_API_KEY;
const RAWG_BASE_URL = 'https://api.rawg.io/api';

if (!RAWG_API_KEY) {
    throw new Error('RAWG_API_KEY must be set in the environment variables');
}

async function testRAWGAPI(): Promise<void> {
    try {
        // Fetch a popular game (using "grand-theft-auto-v" as an example)
        const response = await axios.get(`${RAWG_BASE_URL}/games/grand-theft-auto-v`, {
            params: {
                key: RAWG_API_KEY
            }
        });

        // Log the complete response structure
        console.log('RAWG API Response Structure:');
        console.log(JSON.stringify(response.data, null, 2));

        // RAWG returns the game object directly at response.data
        const data = response.data;
        if (data && typeof data === 'object') {
            console.log('\nKey Fields Available:');
            Object.keys(data).forEach(key => {
                console.log(`- ${key}`);
            });
        }
    } catch (error: any) {
        console.error('Error fetching data from RAWG:', error.message);
        if (error.response) {
            console.error('API Error Response:', error.response.data);
        }
    }
}

testRAWGAPI();
