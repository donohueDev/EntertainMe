import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import axios from 'axios';

const prisma = new PrismaClient();

export interface AnimeProducer {
    id: number;
    animeId: number;
    mal_id: number;
    type: string;
    name: string;
    url: string;
}

export interface AnimeTitle {
    id: number;
    animeId: number;
    type: string;
    title: string;
}

export interface UserAnime {
    id: number;
    userId: number;
    animeId: number;
    rating: number | null;
    status: string | null;
    created_at: string | Date;
}

export interface Anime {
    id?: number; // let Prisma autoincrement
    mal_id: number;
    slug: string;
    url?: string;
    title: string;
    title_english?: string | null;
    title_japanese?: string | null;
    title_synonyms: string[];
    synopsis?: string | null;
    background?: string | null;
    type?: string | null;
    source: string; // always required
    api_source: string; // required for multi-API
    api_source_id: string; // required for multi-API
    episodes?: number | null;
    status?: string | null;
    airing: boolean;
    aired_from?: Date | null;
    aired_to?: Date | null;
    aired_string?: string | null;
    aired_prop?: any; 
    duration?: string | null;
    rating?: string | null;
    score?: number | null;
    scored_by?: number | null;
    rank?: number | null;
    popularity?: number | null;
    members?: number | null;
    favorites?: number | null;
    season?: string | null;
    year?: number | null;
    approved: boolean;
    broadcast_day?: string | null;
    broadcast_time?: string | null;
    broadcast_timezone?: string | null;
    broadcast_string?: string | null;
    trailer?: any; 
    images?: any; 
    producers?: AnimeProducer[];
    titles?: AnimeTitle[];
    userAnimes?: UserAnime[];
    updated_at: string | Date;
    adult?: boolean;
}

const normalizeAnimeName = (name: string): string => {
    // Normalize the anime name by removing special characters and converting to lowercase
    return name.replace(/[^a-zA-Z0-9\s]/g, '').toLowerCase();
};

const isDuplicateAnime = async (anime: Anime): Promise<boolean> => {
    try {
        const existingAnime = await prisma.anime.findUnique({
            where: {
                api_source_api_source_id: {
                    api_source: anime.api_source,
                    api_source_id: anime.api_source_id,
                }
            }
        });
        if (existingAnime) {
            console.log(`Duplicate anime found: ${anime.title} (mal_id: ${anime.mal_id}, api_source: ${anime.api_source}, api_source_id: ${anime.api_source_id})`);
            return true;
        }
        return false;
    } catch (error) {
        console.error('Error checking for duplicate anime:', error);
        return false;
    }
};

const insertAnimeIntoDatabase = async (anime: Anime): Promise<void> => {
    try {
        await prisma.anime.upsert({
            where: {
                api_source_api_source_id: {
                    api_source: anime.api_source,
                    api_source_id: anime.api_source_id,
                }
            },
            update: {
                mal_id: anime.mal_id,
                slug: anime.slug,
                url: anime.url,
                title: anime.title,
                title_english: anime.title_english,
                title_japanese: anime.title_japanese,
                title_synonyms: anime.title_synonyms,
                synopsis: anime.synopsis,
                background: anime.background,
                type: anime.type,
                source: anime.source || '',
                episodes: anime.episodes,
                status: anime.status,
                airing: anime.airing,
                aired_from: anime.aired_from,
                aired_to: anime.aired_to,
                aired_string: anime.aired_string,
                aired_prop: anime.aired_prop,
                duration: anime.duration,
                rating: anime.rating,
                score: anime.score,
                scored_by: anime.scored_by,
                rank: anime.rank,
                popularity: anime.popularity,
                members: anime.members,
                favorites: anime.favorites,
                season: anime.season,
                year: anime.year,
                approved: anime.approved,
                broadcast_day: anime.broadcast_day,
                broadcast_time: anime.broadcast_time,
                broadcast_timezone: anime.broadcast_timezone,
                broadcast_string: anime.broadcast_string,
                trailer: anime.trailer,
                images: anime.images,
                updated_at: anime.updated_at,
                adult: anime.adult,
                api_source: anime.api_source,
                api_source_id: anime.api_source_id,
            },
            create: {
                mal_id: anime.mal_id,
                slug: anime.slug,
                url: anime.url,
                title: anime.title,
                title_english: anime.title_english,
                title_japanese: anime.title_japanese,
                title_synonyms: anime.title_synonyms,
                synopsis: anime.synopsis,
                background: anime.background,
                type: anime.type,
                source: anime.source || '',
                episodes: anime.episodes,
                status: anime.status,
                airing: anime.airing,
                aired_from: anime.aired_from,
                aired_to: anime.aired_to,
                aired_string: anime.aired_string,
                aired_prop: anime.aired_prop,
                duration: anime.duration,
                rating: anime.rating,
                score: anime.score,
                scored_by: anime.scored_by,
                rank: anime.rank,
                popularity: anime.popularity,
                members: anime.members,
                favorites: anime.favorites,
                season: anime.season,
                year: anime.year,
                approved: anime.approved,
                broadcast_day: anime.broadcast_day,
                broadcast_time: anime.broadcast_time,
                broadcast_timezone: anime.broadcast_timezone,
                broadcast_string: anime.broadcast_string,
                trailer: anime.trailer,
                images: anime.images,
                updated_at: anime.updated_at,
                adult: anime.adult,
                api_source: anime.api_source,
                api_source_id: anime.api_source_id,
            }
        });
    } catch (error) {
        console.error('Error inserting anime into database:', error);
    }
};

const allowedAnimeTypes = ["tv", "movie", "ova", "special", "ona", "tv_special"];

// Function to process and insert anime data into the database
const processAnimeData = async (anime: any): Promise<boolean> => {
    try {
        // Accept either id or mal_id for compatibility with Jikan API
        const animeId = anime.id || anime.mal_id;
        // Create a unique slug by appending the MAL ID
        const baseSlug = anime.slug || anime.title?.toLowerCase().replace(/[^a-zA-Z0-9]+/g, '-');
        const animeSlug = `${baseSlug}-${animeId}`;
        const animeTitle = anime.title;
        
        // Set api source fields first
        anime.api_source = 'jikan';
        anime.api_source_id = animeId?.toString() || '';

        if (!animeId || !animeSlug || !animeTitle) {
            console.error('Skipping invalid anime data:', anime);
            return false;
        }
        // Filter out unwanted types
        if (!allowedAnimeTypes.includes((anime.type || '').toLowerCase())) {
            return false;
        }

        // Map aired fields
        let aired_from = null;
        let aired_to = null;
        let aired_string = null;
        let aired_prop = null;
        if (anime.aired) {
            aired_from = anime.aired.from ? new Date(anime.aired.from) : null;
            aired_to = anime.aired.to ? new Date(anime.aired.to) : null;
            aired_string = anime.aired.string || null;
            aired_prop = anime.aired.prop || null;
        }

        // Map broadcast fields
        let broadcast_day = null;
        let broadcast_time = null;
        let broadcast_timezone = null;
        let broadcast_string = null;
        if (anime.broadcast) {
            broadcast_day = anime.broadcast.day || null;
            broadcast_time = anime.broadcast.time || null;
            broadcast_timezone = anime.broadcast.timezone || null;
            broadcast_string = anime.broadcast.string || null;
        }

        // Determine if anime is adult based on rating
        const adultRatings = ['rx'];
        let isAdult = false;
        if (anime.rating) {
            isAdult = adultRatings.includes(anime.rating.toLowerCase());
        }

        // Prepare data for DB insert
        const animeData: Anime = {
            mal_id: anime.mal_id,
            slug: animeSlug,
            url: anime.url,
            title: animeTitle,
            title_english: anime.title_english || null,
            title_japanese: anime.title_japanese || null,
            title_synonyms: anime.title_synonyms || [],
            synopsis: anime.synopsis || null,
            background: anime.background || null,
            type: anime.type || null,
            source: anime.source || '',
            episodes: anime.episodes || null,
            status: anime.status || null,
            airing: anime.airing,
            aired_from: anime.aired?.from ? new Date(anime.aired.from) : null,
            aired_to: anime.aired?.to ? new Date(anime.aired.to) : null,
            aired_string: anime.aired?.string || null,
            aired_prop: anime.aired?.prop || null,
            duration: anime.duration || null,
            rating: anime.rating || null,
            score: anime.score || null,
            scored_by: anime.scored_by || null,
            rank: anime.rank || null,
            popularity: anime.popularity || null,
            members: anime.members || null,
            favorites: anime.favorites || null,
            season: anime.season || null,
            year: anime.year || null,
            approved: anime.approved,
            broadcast_day: anime.broadcast?.day || null,
            broadcast_time: anime.broadcast?.time || null,
            broadcast_timezone: anime.broadcast?.timezone || null,
            broadcast_string: anime.broadcast?.string || null,
            trailer: anime.trailer || null,
            images: anime.images || null,
            updated_at: new Date(),
            adult: isAdult,
            api_source: 'jikan',
            api_source_id: anime.mal_id?.toString() || animeId?.toString(),
        };

        await insertAnimeIntoDatabase(animeData);
        console.log(`Processed and inserted anime: ${animeData.title} (mal_id: ${animeData.mal_id})`);
        return true;
    } catch (error) {
        console.error('Error processing anime data:', error);
        return false;
    }
};

// Controller for handling anime-related requests
export const animeController = {
    // Load anime data from the API and insert into the database
    loadAnimeFromApi: async (_req: Request, res: Response) => {
        try {
            let page = 1;
            const pageSize = 25; // Jikan API recommended page size
            let totalAnimeInserted = 0;
            let duplicatesSkipped = 0;
            const targetAnime = 500;
            const maxRetries = 3;
            const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

            console.log(`Starting to fetch anime from Jikan API... Target: ${targetAnime} anime`);

            while (totalAnimeInserted < targetAnime) {
                let retryCount = 0;
                let success = false;

                while (retryCount < maxRetries && !success) {
                    try {
                        const response = await axios.get<{ data: Anime[] }>('https://api.jikan.moe/v4/anime', {
                            params: {
                                page,
                                limit: pageSize,
                                order_by: 'members',
                                sort: 'desc'
                            }
                        });

                        if (!response.data.data || response.data.data.length === 0) {
                            console.log('No more anime data available');
                            break;
                        }

                        for (const anime of response.data.data) {
                            if (totalAnimeInserted >= targetAnime) break;
                            
                            // Add required fields before checking duplicates
                            const animeWithSource = {
                                ...anime,
                                api_source: 'jikan',
                                api_source_id: (anime.mal_id || anime.id)?.toString() || ''
                            };
                            
                            if (await isDuplicateAnime(animeWithSource)) {
                                duplicatesSkipped++;
                                continue;
                            }

                            const success = await processAnimeData(anime);
                            if (success) {
                                totalAnimeInserted++;
                                console.log(`Processed ${totalAnimeInserted}/${targetAnime} anime`);
                            }
                        }

                        success = true;
                    } catch (error) {
                        retryCount++;
                        console.error(`Attempt ${retryCount} failed:`, error);
                        if (retryCount < maxRetries) {
                            console.log(`Retrying in 5 seconds...`);
                            await delay(5000); // Longer delay for Jikan API rate limits
                        }
                    }
                }

                if (!success) {
                    console.error(`Failed to fetch anime after ${maxRetries} attempts`);
                    break;
                }

                if (totalAnimeInserted >= targetAnime) {
                    break;
                }

                page++;
                await delay(1000); // Respect Jikan API rate limits
            }

            return res.status(200).json({ 
                message: `Successfully inserted ${totalAnimeInserted} anime!`,
                totalAnime: totalAnimeInserted,
                duplicatesSkipped
            });
        } catch (error) {
            console.error('Error loading anime from API:', error);
            return res.status(500).json({ message: 'Internal server error.' });
        }
    },

    // Get all anime from the database
    getAllAnime: async (_req: Request, res: Response) => {
        try {
            const animeList = await prisma.anime.findMany({
                where: {
                    type: {
                        in: allowedAnimeTypes
                    }
                },
                include: {
                    producers: true,
                    titles: true,
                    userAnimes: true
                },
                orderBy: {
                    updated_at: 'desc'
                }
            });
            return res.status(200).json(animeList);
        } catch (error) {
            console.error('Error fetching all anime:', error);
            return res.status(500).json({ message: 'Internal server error.' });
        }
    },
    // Get anime by ID
    getAnimeById: async (req: Request, res: Response) => {
        const { id } = req.params;
        const animeId = parseInt(id, 10);
        if (!id || isNaN(animeId)) {
            return res.status(400).json({ message: 'Invalid or missing anime ID.' });
        }
        try {
            const anime = await prisma.anime.findUnique({
                where: { id: animeId },
                include: {
                    producers: true,
                    titles: true,
                    userAnimes: true
                }
            });

            if (!anime) {
                return res.status(404).json({ message: 'Anime not found.' });
            }

            return res.status(200).json(anime);
        } catch (error) {
            console.error('Error fetching anime by ID:', error);
            return res.status(500).json({ message: 'Internal server error.' });
        }

    },

    getAnimeBySlug: async (req: Request, res: Response) => {
        try {
            const { slug } = req.params;
            if (!slug || typeof slug !== 'string') {
                return res.status(400).json({ message: 'Invalid or missing anime slug.' });
            }
            const anime = await prisma.anime.findUnique({
                where: { slug },
                include: {
                    producers: true,
                    titles: true,
                    userAnimes: true
                }
            });
            if (!anime) {
                return res.status(404).json({ message: 'Anime not found.' });
            }
            return res.status(200).json(anime);
        } catch (error) {
            console.error('Error fetching anime by slug:', error);
            return res.status(500).json({ message: 'Internal server error.' });
        }
    },
    // Search anime by query
    searchAnime: async (req: Request, res: Response) => {
    try {
      const { query } = req.query;
      
      if (!query) {
        return res.status(400).json({ error: 'Search query is required' });
      }

      // Ensure query is a string
      const searchQuery = Array.isArray(query) ? query[0] : query;
      if (typeof searchQuery !== 'string') {
        return res.status(400).json({ error: 'Search query must be a string' });
      }
      const animeList = await prisma.anime.findMany({
        where: {
          OR: [
            { title: { contains: searchQuery, mode: 'insensitive' } },
            { title_english: { contains: searchQuery, mode: 'insensitive' } },
            { title_japanese: { contains: searchQuery, mode: 'insensitive' } }
          ],
        },
        orderBy: {
                rating: 'desc'
        }
            });
            console.log("Found anime:", animeList.length, "results for query:", searchQuery);
            res.json(animeList);
        } catch (error) {
            console.error('Error searching anime:', error);
            return res.status(500).json({ message: 'Internal server error.' });
        }
    },
    // Get top anime based on score
    getTop50Anime: async (_req: Request, res: Response) => {
        try{
            const topAnime = await prisma.top50Anime.findMany({
                include: {
                    anime: {
                        include: {
                            producers: true,
                            titles: true,
                            userAnimes: true
                        }
                    }
                },
                orderBy: {
                    rank: 'asc'
                },
                take: 100
            });
            // Only return entries with a valid anime and allowed type
            const filteredTopAnime = topAnime.filter(entry =>
                entry.anime && allowedAnimeTypes.includes((entry.anime.type || '').toLowerCase())
            );
            if (filteredTopAnime.length === 0) {
                return res.status(404).json({ message: 'No top anime found.' });
            }
            console.log('Found top anime:', filteredTopAnime.length);
            return res.status(200).json(filteredTopAnime);
        } catch (error) {
            console.error('Error fetching top anime:', error);
            return res.status(500).json({ message: 'Internal server error.' });
        }
    },

    updateTopAnime: async (_req: Request, res: Response) => {
        try {
            let topAnimeList: Anime[] = [];
            let page = 1;
            let hasNextPage = true;
            // Keep fetching pages until we have 100 non-adult anime or run out of results
            while (topAnimeList.length < 100 && hasNextPage) {
                const { data: pageData } = await axios.get<{ data: Anime[]; pagination: { has_next_page: boolean } }>(
                    `https://api.jikan.moe/v4/top/anime?limit=25&page=${page}&sfw=true&filter=bypopularity`
                );
                if (!pageData || !pageData.data || pageData.data.length === 0) break;
                for (const anime of pageData.data) {
                    // Mark as not adult (sfw=true means not adult, but double check with our logic)
                    await processAnimeData({ ...anime, adult: false });
                    // Find the anime in the DB (by api_source, which is unique)
                    const dbAnime = await prisma.anime.findUnique({
                        where: {
                            api_source_api_source_id: {
                                api_source: 'jikan',
                                api_source_id: anime.mal_id?.toString() || anime.id?.toString() || '',
                            }
                        }
                    });
                    if (dbAnime) {
                        // Coerce url to string for type compatibility
                        topAnimeList.push({ ...dbAnime, url: dbAnime.url || '' });
                    }
                }
                hasNextPage = pageData.pagination.has_next_page;
                page++;
            }
            // Upsert the top 50 anime into the Top50Anime table
            await prisma.top50Anime.deleteMany(); // Clear existing top 50
            const topAnimeData = topAnimeList
            .filter(anime => typeof anime.id === 'number' && anime.api_source_id)
            .map((anime, index) => ({
                rank: index + 1,
                anime_id: anime.id!,
                value: anime.score ?? null,
                created_at: new Date(),
            }));
            await prisma.top50Anime.createMany({
            data: topAnimeData,
            skipDuplicates: true
            });
            return res.status(200).json({ message: 'Top 50 anime updated successfully.' });
        } catch (error) {
            console.error('Error updating top anime:', error);
            return res.status(500).json({ message: 'Internal server error.' });
        }
    }
};
