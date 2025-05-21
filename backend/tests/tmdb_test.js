import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

async function testTMDBAPI() {
    try {
        // Fetch a popular movie (using The Dark Knight as an example)
        const response = await axios.get(`${TMDB_BASE_URL}/movie/155`, {
            params: {
                api_key: TMDB_API_KEY,
                append_to_response: 'credits,genres,keywords,reviews,videos,similar'
            }
        });

        // Log the complete response structure
        console.log('TMDB API Response Structure:');
        console.log(JSON.stringify(response.data, null, 2));

        // Log the main fields we might want to store
        console.log('\nKey Fields Available:');
        Object.keys(response.data).forEach(key => {
            console.log(`- ${key}`);
        });

    } catch (error) {
        console.error('Error fetching data from TMDB:', error.message);
        if (error.response) {
            console.error('API Error Response:', error.response.data);
        }
    }
}

testTMDBAPI(); 