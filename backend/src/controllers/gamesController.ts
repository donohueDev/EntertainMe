import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import axios from 'axios';

const prisma = new PrismaClient();
const NODE_ENV = process.env.NODE_ENV ?? 'development';

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
  const baseSlug = game.slug.split('-').slice(0, -1).join('-');
  
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
        if (NODE_ENV !== 'production') {
          console.log(`Duplicate found: "${game.name}" (${game.slug}) matches "${existing.name}"`);
        }
        return true;
      }
    }
  }

  return false;
};

// Function to process and insert game data into the database
const processGameData = async (game: Game): Promise<boolean> => {
  try {
    if (await isDuplicateGame(game)) {
      return false;
    }

    if (!game?.id || !game.slug || !game.name) {
      console.warn('Invalid game data:', { id: game?.id, slug: game?.slug, name: game?.name });
      return false;
    }

    const { data: detailedGame } = await axios.get<Game>(`https://api.rawg.io/api/games/${game.id}`, {
      params: { key: process.env.RAWG_API_KEY }
    });

    if (!detailedGame) {
      console.warn(`No detailed data found for game ID ${game.id}`);
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
    const explicitTag = detailedGame.tags?.find(tag => 
      EXPLICIT_CONTENT_TAGS.includes(tag.slug.toLowerCase())
    );
    const hasExplicitTags = !!explicitTag;
    const isExplicit = hasExplicitTags;
    // Use compound unique for upsert
    await prisma.game.upsert({
      where: {
        api_source_api_source_id: {
          api_source: 'rawg',
          api_source_id: detailedGame.id.toString(),
        }
      },
      update: {
        slug: detailedGame.slug,
        name: detailedGame.name,
        released: detailedGame.released ? new Date(detailedGame.released) : null,
        tba: detailedGame.tba,
        background_image: detailedGame.background_image,
        rawg_rating: detailedGame.rating,
        api_source: 'rawg',
        api_source_id: detailedGame.id.toString(),
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
        metacritic: detailedGame.metacritic,
        playtime: detailedGame.playtime,
        updated: detailedGame.updated ? new Date(detailedGame.updated) : null,
        esrb_rating_id: esrbRatingId,
        description_raw: detailedGame.description_raw,
        platforms: {
          deleteMany: {},
          create: (detailedGame.platforms || []).map(p => ({
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
          }))
        },
        tags: {
          deleteMany: {},
          create: (detailedGame.tags || []).map(tag => ({
            tag: {
              connectOrCreate: {
                where: { slug: tag.slug },
                create: {
                  name: tag.name,
                  slug: tag.slug
                }
              }
            }
          }))
        },
        adultContent: isExplicit ? {
          upsert: {
            create: {
              reason: getExplicitReason(hasExplicitTags),
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
        slug: detailedGame.slug,
        name: detailedGame.name,
        released: detailedGame.released ? new Date(detailedGame.released) : null,
        tba: detailedGame.tba,
        background_image: detailedGame.background_image,
        rawg_rating: detailedGame.rating,
        api_source: 'rawg',
        api_source_id: detailedGame.id.toString(),
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
        metacritic: detailedGame.metacritic,
        playtime: detailedGame.playtime,
        updated: detailedGame.updated ? new Date(detailedGame.updated) : null,
        esrb_rating_id: esrbRatingId,
        description_raw: detailedGame.description_raw,
        platforms: {
          create: (detailedGame.platforms || []).map(p => ({
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
          }))
        },
        tags: {
          create: (detailedGame.tags || []).map(tag => ({
            tag: {
              connectOrCreate: {
                where: { slug: tag.slug },
                create: {
                  name: tag.name,
                  slug: tag.slug
                }
              }
            }
          }))
        },
        adultContent: isExplicit ? {
          create: {
            reason: getExplicitReason(hasExplicitTags),
            trigger_tag: explicitTag?.slug || null
          }
        } : undefined
      }
    });
    if (NODE_ENV !== 'production') {
      console.log(`Processed: ${detailedGame.name}`);
    }
    return true;
  } catch (error) {
    console.error('Game processing error:', {
      game: game?.name || 'unknown',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
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
      
      if (NODE_ENV !== 'production') {
        console.log(`Starting RAWG fetch. Target: ${targetGames}`);
      }

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
                  continue;
                }

                const wasInserted = await processGameData(game);
                if (wasInserted) {
                  totalGamesInserted++;
                  if (totalGamesInserted % 50 === 0 && NODE_ENV !== 'production') {
                    console.log(`Progress: ${totalGamesInserted}/${targetGames}`);
                  }
                }
                await delay(100);
              } catch (err) {
                console.error(`Game insertion failed:`, {
                  id: game.id,
                  error: err instanceof Error ? err.message : 'Unknown error'
                });
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

      return res.status(200).json({ 
        message: `Successfully inserted ${totalGamesInserted} games!`,
        totalGames: totalGamesInserted,
        duplicatesSkipped
      });
    } catch (error) {
      console.error('RAWG fetch error:', error instanceof Error ? error.message : 'Unknown error');
      return res.status(500).json({ 
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
      return res.json(games);
    } catch (error) {
      console.error('Database error in getAllGames:', error instanceof Error ? error.message : 'Unknown error');
      return res.status(500).json({ error: 'Database error' });
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

      if (NODE_ENV !== 'production') {
        console.log(`Retrieved game: ${game.name}`);
      }
      return res.json(game);
    } catch (error) {
      console.error('Error in getGameBySlug:', error instanceof Error ? error.message : 'Unknown error');
      return res.status(500).json({ error: 'Database error' });
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
      
      const maxPages = 4; // Stop after this many pages if not enough candidates
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
                      // After upsert, get the internal DB id for the game
                      const dbGame = await prisma.game.findUnique({
                        where: {
                          api_source_api_source_id: {
                            api_source: 'rawg',
                            api_source_id: game.id.toString(),
                          }
                        }
                      });
                      // Only push if dbGame is not null
                      if (dbGame) {
                        candidateGames.push({ id: dbGame.id, name: game.name, combinedScore });
                      } else {
                        console.warn(`Could not find dbGame for RAWG ID: ${game.id}`);
                      }
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
      // Take as many as we have (up to 100)
      const topGames = candidateGames.slice(0, 100);
      // If we have less than 100, fill the rest with highest rawg-rated games from the last year in the local DB
      if (topGames.length < 100) {
        const needed = 100 - topGames.length;
        // Get highest rated games from DB that are not already in topGames and were released in the last year
        const extraGames = await prisma.game.findMany({
          where: {
            id: { notIn: topGames.map(g => g.id) },
            rawg_rating: { not: null },
            // Ensure game was released in the last year
            released: {
              gte: oneYearAgo,
              lte: today
            },
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
      // Prepare topGameInserts array for createMany
      const topGameInserts = topGames.map((g, idx) => ({
        game_id: g.id,
        rank: idx + 1
      }));

      // Insert top games into the database using a transaction
      await prisma.$transaction([
        prisma.top50Games.deleteMany({}),
        prisma.top50Games.createMany({ data: topGameInserts })
      ]);
      console.log('Inserted top 100 games into database');
      res.status(200).json({ message: 'Top games updated successfully' });
    } catch (error) {
      console.error('Error updating top games:', error);
      res.status(500).json({ error: 'Database error' });
    }
  },
};