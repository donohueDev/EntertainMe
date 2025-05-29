import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import axios from 'axios';

const prisma = new PrismaClient();

interface Platform {
  id: number;
  slug: string;
  name: string;
}

interface PlatformDetails {
  platform: Platform;
  released_at?: string;
  requirements?: {
    minimum?: string;
    recommended?: string;
  };
}

interface Game {
  id: number;
  slug: string;
  name: string;
  released?: string;
  tba?: boolean;
  background_image?: string;
  rating?: number; 
  metacritic?: number;
  playtime?: number;
  updated?: string;
  esrb_rating?: {
    id: number;
    slug: string;
    name: string;
  };
  description_raw?: string;
  tags?: {
    id: number;
    name: string;
    slug: string;
  }[];
  platforms?: PlatformDetails[];
}

const EXPLICIT_CONTENT_TAGS = [
  'nsfw',
  'porn',
  'hentai',
  'erotic',
];

// Add these helper functions at the top of the file
const normalizeGameName = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[-_\s]/g, '')   // Remove hyphens, underscores, and spaces
    .replace(/[^\w]/g, '')    // Remove all non-word characters
    .trim();                  // Remove any leading/trailing whitespace
};

const isDuplicateGame = async (game: Game): Promise<boolean> => {
  // Get the base name of the game (e.g., "black-myth" from "black-myth-wukong")
  const baseSlug = game.slug.split('-').slice(0, -1).join('-');
  
  // Only fetch games that have a similar base slug
  const potentialDuplicates = await prisma.game.findMany({
    where: {
      NOT: { id: game.id },
      slug: {
        contains: baseSlug,
        mode: 'insensitive'
      }
    },
    select: {
      id: true,
      name: true,
      slug: true
    },
    take: 5 // Limit the number of potential matches
  });

  if (potentialDuplicates.length > 0) {
    const newGameNormalized = normalizeGameName(game.name);
    
    // Check only the fetched potential duplicates
    for (const existing of potentialDuplicates) {
      const existingNormalized = normalizeGameName(existing.name);
      
      if (newGameNormalized === existingNormalized) {
        console.log(`Duplicate found:
          New: "${game.name}" (${game.slug})
          Existing: "${existing.name}" (${existing.slug})`);
        return true;
      }
    }
  }

  return false;
};

// Function to process and insert game data into the database
const processGameData = async (game: Game): Promise<boolean> => {
  try {
    // Add duplicate check at the beginning
    if (await isDuplicateGame(game)) {
      console.log(`Skipping duplicate game: ${game.name}`);
      return false;
    }

    if (!game?.id || !game.slug || !game.name || !game.released) {
      console.error('Skipping invalid game data:', game);
      return false;
    }

    const { data: detailedGame } = await axios.get<Game>(`https://api.rawg.io/api/games/${game.id}`, {
      params: { key: process.env.RAWG_API_KEY }
    });
    if (!detailedGame) {
      console.error(`No detailed data found for game ID ${game.id}`);
      return false;
    }

    let esrbRatingId = null;
    if (detailedGame.esrb_rating) {
      const esrbRating = await prisma.esrbRating.upsert({
        where: { id: detailedGame.esrb_rating.id },
        create: {
          id: detailedGame.esrb_rating.id,
          slug: detailedGame.esrb_rating.slug,
          name: detailedGame.esrb_rating.name
        },
        update: {
          slug: detailedGame.esrb_rating.slug,
          name: detailedGame.esrb_rating.name
        }
      });
      esrbRatingId = esrbRating.id;
    }

    // Check for explicit content
    const explicitTag = detailedGame.tags?.find(tag => 
      EXPLICIT_CONTENT_TAGS.includes(tag.slug.toLowerCase())
    );
    const hasExplicitTags = !!explicitTag;
    const isExplicit = hasExplicitTags;

    // Create or update the game
    const createdGame = await prisma.game.upsert({
      where: { id: detailedGame.id },
      update: {
        slug: detailedGame.slug,
        name: detailedGame.name,
        released: detailedGame.released ? new Date(detailedGame.released) : null,
        tba: detailedGame.tba,
        background_image: detailedGame.background_image,
        rawg_rating: detailedGame.rating,
        
        // Initialize site ratings
        rating: 0,
        rating_top: 5,
        ratings: {},
        ratings_count: 0,
        reviews_count: 0,
        added: 0,
        added_by_status: {
          playing: 0,
          planned: 0,
          completed: 0,
          dropped: 0,
        },
        // Keep external metadata
        metacritic: detailedGame.metacritic,
        playtime: detailedGame.playtime,
        updated: detailedGame.updated ? new Date(detailedGame.updated) : null,
        esrb_rating_id: esrbRatingId,
        description_raw: detailedGame.description_raw,

        
        // Handle platforms
        platforms: {
          deleteMany: {},
          create: detailedGame.platforms?.map(p => ({
            platform: {
              connectOrCreate: {
                where: { id: p.platform.id },
                create: {
                  id: p.platform.id,
                  slug: p.platform.slug,
                  name: p.platform.name
                }
              }
            },
            released_at: p.released_at,
            requirements_min: p.requirements?.minimum,
            requirements_rec: p.requirements?.recommended
          })) || []
        },

        // Handle tags and adult content (existing code)
        tags: {
          deleteMany: {},
          create: detailedGame.tags?.map(tag => ({
            tag: {
              connectOrCreate: {
                where: { slug: tag.slug },
                create: {
                  name: tag.name,
                  slug: tag.slug
                }
              }
            }
          })) || []
        },
        adultContent: isExplicit ? {
          upsert: {
            create: {
              reason: getExplicitReason( hasExplicitTags),
              trigger_tag: explicitTag?.slug || null
            },
            update: {
              reason: getExplicitReason(hasExplicitTags),
              trigger_tag: explicitTag?.slug || null
            }
          }
        } : undefined
      },
      create: {
        id: detailedGame.id,
        slug: detailedGame.slug,
        name: detailedGame.name,
        released: detailedGame.released ? new Date(detailedGame.released) : null,
        tba: detailedGame.tba,
        background_image: detailedGame.background_image,
        rawg_rating: detailedGame.rating,
        // Initialize our own site-specific fields
        rating: 0,
        rating_top: 5,
        ratings: {},
        ratings_count: 0,
        added: 0,
        added_by_status: {
          playing: 0,
          planned: 0,
          completed: 0,
          dropped: 0,
        },
        // Keep external metadata
        metacritic: detailedGame.metacritic,
        playtime: detailedGame.playtime,
        updated: detailedGame.updated ? new Date(detailedGame.updated) : null,
        esrb_rating_id: esrbRatingId,
        description_raw: detailedGame.description_raw,
        platforms: {
          create: detailedGame.platforms?.map(p => ({
            platform: {
              connectOrCreate: {
                where: { id: p.platform.id },
                create: {
                  id: p.platform.id,
                  slug: p.platform.slug,
                  name: p.platform.name
                }
              }
            },
            released_at: p.released_at,
            requirements_min: p.requirements?.minimum,
            requirements_rec: p.requirements?.recommended
          })) || []
        },
        tags: {
          create: detailedGame.tags?.map(tag => ({
            tag: {
              connectOrCreate: {
                where: { slug: tag.slug },
                create: {
                  name: tag.name,
                  slug: tag.slug
                }
              }
            }
        })) || []
        },
        adultContent: isExplicit ? {
          create: {
            reason: getExplicitReason(hasExplicitTags),
            trigger_tag: explicitTag?.slug || null
          }
        } : undefined,
      }
    });

    console.log(`Successfully ${game.id === createdGame.id ? 'inserted' : 'updated'} game ${detailedGame.name} (ID: ${createdGame.id})`);
    return true;
  } catch (error) {
    console.error('Error processing game data:', error);
    return false;
  }
};

// Helper function for determining explicit content reason
const getExplicitReason = (hasExplicitTags: boolean): string => {
  if (hasExplicitTags) return 'explicit-content-tags';
  return 'unknown';
};

export const gamesController = {
  // Load games from RAWG API
  loadGamesFromRawg: async (_req: Request, res: Response) => {
    try {
      let page = 1;
      const pageSize = 40;
      let totalGamesInserted = 0;
      let duplicatesSkipped = 0;
      const targetGames = 500;
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
                // Check for duplicates before processing
                if (await isDuplicateGame(game)) {
                  duplicatesSkipped++;
                  console.log(`Skipping duplicate game: ${game.name} (Duplicates skipped: ${duplicatesSkipped})`);
                  continue;
                }

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
        totalGames: totalGamesInserted,
        duplicatesSkipped
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
  getAllGames: async (req: Request, res: Response) => {
    try {
      const showAdult = req.query.adult === 'true';
      
      const games = await prisma.game.findMany({
        where: showAdult ? {} : {
          adultContent: null // This means no adult content record exists for the game
        },
        orderBy: { rating: 'desc' },
        include: {
          tags: {
            include: {
              tag: true
            }
          }
        }
      });  
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

      const games = await prisma.game.findMany({  
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
      prisma.game.count()  
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

      const game = await prisma.game.findUnique({  
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

  // Get game by slug
  getGameBySlug: async (req: Request, res: Response) => {
    try {
      const { slug } = req.params;
      
      if (!slug) {
        return res.status(400).json({ error: 'Invalid game slug' });
      }

      const game = await prisma.game.findUnique({  
        where: { slug },
        include: {
          platforms: {
            include: {
              platform: true
            }
          },
          tags: {
            include: {
              tag: true
            }
          },
          esrb_rating: true,
          adultContent: true
        }
      });
      
      if (!game) {
        return res.status(404).json({ error: 'Game not found' });
      }
      console.log('Found game using slug:', game.name);
      res.json(game);
    } catch (error) {
      console.error('Error fetching game:', error);
      res.status(500).json({ error: 'Database error' });
    }
  },

  // Get top 50 games
  getTopGames: async (_req: Request, res: Response) => {
    try {
      const topGames = await prisma.top50Games.findMany({
        orderBy: { rank: 'asc' },
        include: {
          game: {
            select: {
              id: true,
              name: true,
              background_image: true,
              slug: true,
            }
          }
        }
      });
      
      console.log('Found top popular games:', topGames.length);
      res.json(topGames);
    } catch (error) {
      console.error('Error fetching top games:', error);
      res.status(500).json({ error: 'Database error' });
    }
  },

  // Update top games
  updateTopGames: async (_req: Request, res: Response) => {
    try {
      const today = new Date();
      const oneYearAgo = new Date(today);
      oneYearAgo.setFullYear(today.getFullYear() - 1);
      let page = 1;
      const pageSize = 40;
      const startDate = oneYearAgo.toISOString().split('T')[0];
      const endDate = today.toISOString().split('T')[0];
      const targetCount = 100;
      let successCount = 0;
      const maxRetries = 3;
      const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
      const candidateGames: Array<{id: number, name: string, combinedScore: number}> = [];
      
      const maxPages = 3; // Stop after this many pages if not enough candidates
      // Clear existing top games
      await prisma.top50Games.deleteMany({});
      console.log('Cleared existing top 50 games from database');
      let pagesFetched = 0;
      let reachedPageLimit = false;
      while (successCount < targetCount && !reachedPageLimit) {
        let retryCount = 0;
        let success = false;

        while (retryCount < maxRetries && !success) {
          try {
            const { data } = await axios.get<{ results: Game[] }>('https://api.rawg.io/api/games', {
              params: { 
                key: process.env.RAWG_API_KEY, 
                page, 
                page_size: pageSize,
                dates: `${startDate},${endDate}`,
                ordering: '-rating',
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
              if (successCount >= targetCount) break;

              try {
                // Allow games with missing metacritic, but require at least a rating
                if(game.rating === undefined || game.rating === null) {
                  console.log(`Skipping game ${game.name} (ID: ${game.id}) due to missing rating`);
                  continue;
                }
                const wasInserted = await processGameData(game);
                if (wasInserted) {
                  successCount++;
                  console.log(`Successfully inserted ${successCount} games so far.`);
                  // Only add to candidateGames if metacritic is present
                  if (game.metacritic !== undefined && game.metacritic !== null) {
                    // Normalize rawg_rating to 100 scale and average with metacritic
                    const normalizedRawg = game.rating * 20;
                    const combinedScore = (normalizedRawg + game.metacritic) / 2;
                    if (combinedScore > 0) {
                      candidateGames.push({ id: game.id, name: game.name, combinedScore });
                    }
                  }
                } else{
                  console.log(`Skipping game ${game.name} (ID: ${game.id}) due to duplicate or invalid data`);
                  continue;
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

        pagesFetched++;
        if (pagesFetched >= maxPages) {
          reachedPageLimit = true;
          break;
        }
        if (successCount >= targetCount) {
          break;
        }
        page++;
        await delay(1000);
      }
      // Sort candidate games by combined score
      candidateGames.sort((a, b) => b.combinedScore - a.combinedScore);
      // Take as many as we have (up to 50)
      const topGames = candidateGames.slice(0, 50);
      // If we have less than 50, fill the rest with highest rawg-rated games from the local DB
      if (topGames.length < 50) {
        const needed = 50 - topGames.length;
        // Get highest rated games from DB that are not already in topGames
        const extraGames = await prisma.game.findMany({
          where: {
            id: { notIn: topGames.map(g => g.id) },
            rawg_rating: { not: null },
            // Exclude adult content
            adultContent: null
          },
          orderBy: { rawg_rating: 'desc' },
          take: needed
        });
        for (const g of extraGames) {
          // Normalize rawg_rating to 100 scale for extra games
          const normalizedRawg = (g.rawg_rating ?? 0) * 20;
          topGames.push({ id: g.id, name: g.name, combinedScore: normalizedRawg });
        }
      }
      // Insert top games into the database
      const topGameInserts = topGames.map((game, index) => ({
        rank: index + 1,
        game_id: game.id
      }));
      await prisma.top50Games.createMany({ data: topGameInserts });
      console.log('Inserted top 50 games into database');
      res.status(200).json({ message: 'Top games updated successfully' });
    } catch (error) {
      console.error('Error updating top games:', error);
      res.status(500).json({ error: 'Database error' });
    }
  },
};