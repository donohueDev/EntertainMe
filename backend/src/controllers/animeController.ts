import { Request, Response } from 'express';
import axios from 'axios';
import pool from '../config/database';

interface Anime {
    id: number;
    slug: string;
    title: string;
    title_english: string | null;
    title_japanese: string | null;
    synopsis: string | null;
    description_raw: string | null;
    image_url: string | null;
    trailer_url: string | null;
    type: string | null;
    source: string | null;
    episodes: number | null;
    status: string | null;
    airing: boolean;
    aired: any;
    duration: string | null;
    rating: string | null;
    score: number | null;
    scored_by: number | null;
    rank: number | null;
    popularity: number | null;
    members: number | null;
    favorites: number | null;
    genres: { name: string }[];
    studios: { name: string }[];
    season: string | null;
    year: number | null;
    updated_at: string | Date;
}

// Function to process and insert anime data into the database
const processAnimeData = async (anime: Anime): Promise<void> => {
    try {
        if (!anime?.id || !anime.slug || !anime.title) {
            console.error('Skipping invalid anime data:', anime);
            return;
        }

        // Fetch detailed anime data from the API
        const { data: detailedAnime } = await axios.get<Anime>(`https://api.jikan.moe/v4/anime/${anime.id}`, {
            params: { fields: 'id,slug,title,title_english,title_japanese,synopsis,description_raw,image_url,trailer_url,type,source,episodes,status,airing,aired,duration,rating,score,scored_by,rank,popularity,members,favorites,genres,studios,season,year' }
        });

        const existingAnimeResult = await pool.query('SELECT id FROM anime WHERE id = $1', [anime.id]);
        
        if (existingAnimeResult.rows.length > 0) {
            console.log(`Anime with ID ${anime.id} already exists in the database.`);
            return;
        }

        await pool.query(`
            INSERT INTO anime (
                id, slug, title, title_english, title_japanese, synopsis, description_raw,
                image_url, trailer_url, type, source, episodes, status, airing,
                aired, duration, rating, score, scored_by, rank, popularity,
                members, favorites, genres, studios, season, year, updated_at
            ) VALUES ($1, $2, $3, $4, $5, $6, $7,
                      $8, $9, $10, $11, $12, $13,
                      $14::boolean, $15::jsonb, $16,
                      $17::text[], $18::text[], $19::text[], $20::text[],
                      $21::int[], $22::int[], $23::int[], $24::int[],
                      $25::int[], $26::int[], NOW())
        `, [
            anime.id,
            anime.slug,
            anime.title,
            anime.title_english,
            anime.title_japanese,
            anime.synopsis,
            anime.description_raw,
            anime.image_url,
            anime.trailer_url,
            anime.type,
            anime.source,
            anime.episodes,
            anime.status,
            anime.airing,
            JSON.stringify(anime.aired),
            anime.duration,
            anime.rating,
            anime.score,
            anime.scored_by,
            anime.rank,
            anime.popularity,
            anime.members,
            anime.favorites,
            JSON.stringify(anime.genres.map(g => g.name)),
            JSON.stringify(anime.studios.map(s => s.name)),
            anime.season,
            anime.year
        ]);

        console.log(`Inserted Anime ID: ${anime.id}`);
    } catch (error) {
        console.error('Error processing anime data:', error);
    }
};

// Controller for handling anime-related requests
export const animeController = {
    // Load anime data from the API and insert into the database
    loadAnimeFromApi: async (_req: Request, res: Response) => {
        try {
            const { data: animeList } = await axios.get<{ data: Anime[] }>('https://api.jikan.moe/v4/anime', {
                params: { page: 1, limit: 100 }
            });

            for (const anime of animeList.data) {
                await processAnimeData(anime);
            }

            res.status(200).json({ message: 'Anime data loaded successfully.' });
        } catch (error) {
            console.error('Error loading anime data:', error);
            res.status(500).json({ error: 'Failed to load anime data.' });
        }
    },

    // Get all anime from the database
    getAllAnime: async (_req: Request, res: Response) => {
        try {
            const result = await pool.query('SELECT * FROM anime ORDER BY id ASC');
            res.status(200).json(result.rows);
        } catch (error) {
            console.error('Error fetching all anime:', error);
            res.status(500).json({ error: 'Failed to fetch anime.' });
        }
    },
    // Get anime by ID
    getAnimeById: async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const result = await pool.query('SELECT * FROM anime WHERE id = $1', [id]);
            if (result.rows.length === 0) {
                return res.status(404).json({ error: 'Anime not found' });
            }
            res.status(200).json(result.rows[0]);
        } catch (error) {
            console.error('Error fetching anime by ID:', error);
            res.status(500).json({ error: 'Failed to fetch anime by ID.' });
        }
    },
    // Search anime by query
    searchAnime: async (req: Request, res: Response) => {
        const { query } = req.params;
        try {
            const result = await pool.query('SELECT * FROM anime WHERE title ILIKE $1', [`%${query}%`]);
            res.status(200).json(result.rows);
        } catch (error) {
            console.error('Error searching anime:', error);
            res.status(500).json({ error: 'Failed to search anime.' });
        }
    },
    // Get top anime based on score
    getTopAnime: async (_req: Request, res: Response) => {
        try {
            const result = await pool.query('SELECT * FROM anime ORDER BY score DESC LIMIT 50');
            res.status(200).json(result.rows);
        } catch (error) {
            console.error('Error fetching top anime:', error);
            res.status(500).json({ error: 'Failed to fetch top anime.' });
        }
    },
    // Test route to check database connection
    testConnection: async (_req: Request, res: Response) => {
        try {
            const result = await pool.query('SELECT COUNT(*) as count FROM anime');
            console.log('Database connection successful, anime count:', result.rows[0].count);
            res.status(200).json({ message: 'Database is working', animeCount: result.rows[0].count });
        } catch (error) {
            console.error('Error in test route:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
};
