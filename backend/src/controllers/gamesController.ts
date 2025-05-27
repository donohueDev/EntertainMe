import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import axios from 'axios';

const prisma = new PrismaClient();

interface Game {
  id: number;
  slug: string;
  name: string;
  released?: string;
  tba?: boolean;
  background_image?: string;
  rating?: number;
  rating_top?: number;
  ratings_count?: number;
  reviews_text_count?: number;
  added?: number;
  metacritic?: number;
  playtime?: number;
  suggestions_count?: number;
  updated?: string;
  reviews_count?: number;
  saturated_color?: string;
  dominant_color?: string;
  esrb_rating?: { name: string };
  description_raw?: string;
  description?: string;
}

// Function to process and insert game data into the database
const processGameData = async (game: Game): Promise<boolean> => {
  try {
    if (!game?.id || !game.slug || !game.name || !game.released) {
      console.error('Skipping invalid game data:', game);
      return false;
    }

    const { data: detailedGame } = await axios.get<Game>(`https://api.rawg.io/api/games/${game.id}`, {
      params: { key: process.env.RAWG_API_KEY }
    });

    // Check ESRB rating
    const isAdultsOnly = detailedGame.esrb_rating?.name.toLowerCase() === 'adults-only' || detailedGame.esrb_rating?.name.toLowerCase() === 'adults only';

    if (isAdultsOnly || !detailedGame.esrb_rating) {
      console.log(`Skipping game ${detailedGame.name} due to explicit content`);
      return false;
    }

    const existingGame = await prisma.gameCollection.findUnique({
      where: { id: game.id }
    });
    
    if (existingGame) {
      console.log(`Game with ID ${game.id} already exists in the database.`);
      return false;
    }

    await prisma.gameCollection.create({
      data: {
        id: detailedGame.id,
        slug: detailedGame.slug,
        name: detailedGame.name,
        released: detailedGame.released,
        tba: detailedGame.tba,
        background_image: detailedGame.background_image,
        rating: detailedGame.rating,
        rating_top: detailedGame.rating_top,
        ratings_count: detailedGame.ratings_count,
        reviews_text_count: detailedGame.reviews_text_count,
        added: detailedGame.added,
        metacritic: detailedGame.metacritic,
        playtime: detailedGame.playtime,
        suggestions_count: detailedGame.suggestions_count,
        updated: detailedGame.updated,
        reviews_count: detailedGame.reviews_count,
        saturated_color: detailedGame.saturated_color,
        dominant_color: detailedGame.dominant_color,
        esrb_rating: detailedGame.esrb_rating?.name,
        description_raw: detailedGame.description_raw ?? detailedGame.description
      }
    });

    console.log(`Successfully inserted game ${detailedGame.name}`);
    return true;
  } catch (error) {
    console.error('Error processing game data:', error);
    return false;
  }
};

export const gamesController = {
  // Load games from RAWG API
  loadGamesFromRawg: async (_req: Request, res: Response) => {
    try {
      let page = 1;
      const pageSize = 40;
      let totalGamesInserted = 0;
      const targetGames = 50;
      const maxRetries = 3;
      const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
      
      console.log(`Starting to fetch games from RAWG API... Target: ${targetGames} games`);
      while (totalGamesInserted < targetGames) {
        let retryCount = 0;
        let success = false;

        while (retryCount < maxRetries && !success) {
          try {
            const { data } = await axios.get<{ results: Game[] }>('https://api.rawg.io/api/games', {
              params: { 
                key: process.env.RAWG_API_KEY, 
                page, 
                page_size: pageSize,
                ordering: '-ratings_count',
                exclude_parents: true,
                exclude_additions: true,
              },
            });

            const games = data.results;
            if (!games.length) {
              console.log('No more games to fetch');
              break;
            }

            for (const game of games) {
              if (totalGamesInserted >= targetGames) break;
              
              try {
                const wasInserted = await processGameData(game);
                if (wasInserted) {
                  totalGamesInserted++;
                  console.log(`Successfully inserted ${totalGamesInserted} games so far.`);
                }
                await delay(100);
              } catch (err) {
                console.error(`Failed to insert game ${game.id}:`, err instanceof Error ? err.message : 'Unknown error');
              }
            }

            success = true;
          } catch (error) {
            retryCount++;
            console.error(`Attempt ${retryCount} failed:`, error);
            if (retryCount < maxRetries) {
              await delay(1000 * retryCount);
            }
          }
        }

        if (!success) {
          console.error(`Failed to fetch games after ${maxRetries} attempts`);
          break;
        }

        if (totalGamesInserted >= targetGames) {
          break;
        }

        page++;
        await delay(1000);
      }

      res.status(200).json({ 
        message: `Successfully inserted ${totalGamesInserted} games!`,
        totalGames: totalGamesInserted
      });
    } catch (error) {
      console.error('Error fetching or inserting games:', error);
      res.status(500).json({ 
        error: 'Failed to fetch games',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  },

  // Get all games
  getAllGames: async (_req: Request, res: Response) => {
    try {
      const games = await prisma.gameCollection.findMany({
        orderBy: { rating: 'desc' }
      });
      
      console.log('Found games:', games.length);
      res.json(games);
    } catch (error) {
      console.error('Error fetching games:', error);
      res.status(500).json({ error: 'Database error' });
    }
  },

  // Search gameCollection
  searchGames: async (req: Request, res: Response) => {
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

      const games = await prisma.gameCollection.findMany({
        where: {
          OR: [
            { name: { contains: searchQuery, mode: 'insensitive' } },
            { slug: { contains: searchQuery, mode: 'insensitive' } }
          ]
        },
        orderBy: { rating: 'desc' }
      });
      
      console.log('Found games:', games.length);
      res.json(games);
    } catch (error) {
      console.error('Error searching games:', error);
      res.status(500).json({ error: 'Database error' });
    }
  },

  // Test database connection
  testConnection: (_req: Request, res: Response) => {
    try {
      prisma.gameCollection.count()
        .then(count => {
          console.log('Database connection successful, games count:', count);
          res.json({ message: 'Database is working', gamesCount: count });
        })
        .catch(err => {
          console.error('Error checking games count:', err);
          res.status(500).json({ error: 'Database error' });
        });
    } catch (error) {
      console.error('Error in test route:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Get game by ID
  getGameById: async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      
      if (isNaN(id) || id <= 0) {
        return res.status(400).json({ error: 'Invalid game ID' });
      }

      const game = await prisma.gameCollection.findUnique({
        where: { id }
      });
      
      if (!game) {
        return res.status(404).json({ error: 'Game not found' });
      }
      console.log('Found game using search query:', game);
      res.json(game);
    } catch (error) {
      console.error('Error fetching game:', error);
      res.status(500).json({ error: 'Database error' });
    }
  },

  // Get top 50 games
  getTopGames: async (_req: Request, res: Response) => {
    try {
      const topGames = await prisma.gameCollection.findMany({
        where: {
          ratings_count: {
            gt: 0 // Only include games with ratings
          }
        },
        orderBy: [
          { ratings_count: 'desc' }, // Primary sort by number of ratings
          { rating: 'desc' }         // Secondary sort by rating
        ],
        take: 50
      });
      
      console.log('Found top popular games:', topGames.length);
      res.json(topGames);
    } catch (error) {
      console.error('Error fetching top games:', error);
      res.status(500).json({ error: 'Database error' });
    }
  }
};