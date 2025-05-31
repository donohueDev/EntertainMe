import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BEARER_TOKEN = process.env.TMDB_BEARER_TOKEN;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
if (!TMDB_API_KEY || !TMDB_BEARER_TOKEN) {
    throw new Error('TMDB_API_KEY and TMDB_BEARER_TOKEN must be set in the environment variables');
}

interface TMDBMovie {
    id: number;
    title: string;
    overview: string;
    release_date: string;
    genres: Array<{ id: number; name: string }>;
    credits?: any;
    keywords?: any;
    reviews?: any;
    videos?: any;
    similar?: any;
    [key: string]: any;
}

async function testTMDBAPI(): Promise<void> {
    try {
        // Fetch a popular movie (using Star Wars: A New Hope as an example, id=11)
        const response = await axios.get<TMDBMovie>(`${TMDB_BASE_URL}/movie/11`, {
            headers: {
                Authorization: `Bearer ${TMDB_BEARER_TOKEN}`,
                accept: 'application/json',
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

    } catch (error: any) {
        console.error('Error fetching data from TMDB:', error.message);
        if (error.response) {
            console.error('API Error Response:', error.response.data);
        }
    }
}

testTMDBAPI();