import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const JAKI_BASE_URL = 'https://api.jikan.moe/v4';

// Jikan (JAKI) does not require an API key, but we include it for future-proofing

async function testJikanAPI(): Promise<void> {
    try {
        // Fetch a popular anime (using "Sousou no Frieren" as an example, mal_id=52991)
        const response = await axios.get(`${JAKI_BASE_URL}/anime/52991`);

        // Log the complete response structure
        console.log('Jikan API Response Structure:');
        console.log(JSON.stringify(response.data, null, 2));

        // Log the main fields we might want to store
        const data = (response.data as any).data;
        if (data) {
            console.log('\nKey Fields Available:');
            Object.keys(data).forEach(key => {
                console.log(`- ${key}`);
            });
        }
    } catch (error: any) {
        console.error('Error fetching data from Jikan/JAKI:', error.message);
        if (error.response) {
            console.error('API Error Response:', error.response.data);
        }
    }
}

testJikanAPI();
