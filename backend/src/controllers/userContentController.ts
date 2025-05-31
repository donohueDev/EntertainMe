import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export default prisma;

interface gameRatingRequest {
  username: string;
  gameId: number;
  rating: number;
  status: string;
}

interface animeRatingRequest {
  username: string;
  animeId: number;
  rating: number;
  status: string;
}

export const userContentController = {
  // Get games for a specific user by their ID
  getUserGames: async (req: Request, res: Response) => {
    const { userId } = req.params;
    console.log("Request to /api/userGames/:userId/games");
    console.log("User ID from params:", userId);

    try {
      const userGames = await prisma.userGame.findMany({
        where: {
          userId: parseInt(userId)
        },
        include: {
          game: true
        }
      });

      if (!userGames || userGames.length === 0) {
        return res.json([]);
      }

      const combinedGames = userGames.map((userGame) => ({
        ...userGame.game,
        user_rating: userGame.rating,
        user_status: userGame.status
      }));

      res.status(200).json(combinedGames);
    } catch (error) {
      console.error('Error retrieving games for user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Submit or update a rating
  submitGameRating: async (req: Request<object, {}, gameRatingRequest>, res: Response) => {
    const { username, gameId, rating, status } = req.body;
    console.log("Request to /api/ratings");

    try {
      const user = await prisma.user.findUnique({
        where: { username }
      });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Upsert the user's rating/status for the game
      await prisma.userGame.upsert({
        where: {
          userId_gameId: {
            userId: user.id,
            gameId: gameId
          }
        },
        update: {
          rating,
          status
        },
        create: {
          userId: user.id,
          gameId: gameId,
          rating,
          status
        }
      });

      // After upserting the userGame entry, update the user's aggregate counts
      const [gameReviewsCount, animeReviewsCount] = await Promise.all([
        prisma.userGame.count({
          where: {
            userId: user.id,
            rating: { not: null }
          }
        }),
        prisma.userAnime.count({
          where: {
            userId: user.id,
            rating: { not: null }
          }
        })
      ]);

      await prisma.user.update({
        where: { id: user.id },
        data: {
          game_reviews_count: gameReviewsCount,
          anime_reviews_count: animeReviewsCount,
          total_reviews_count: gameReviewsCount + animeReviewsCount
        }
      });

      // Update aggregate fields in the Game table
      // 1. Get all user ratings for this game
      const allUserGames = await prisma.userGame.findMany({
        where: { gameId },
        select: { rating: true, status: true }
      });
      const ratingsArr = allUserGames.map(ug => ug.rating).filter(r => typeof r === 'number');
      const ratingCount = ratingsArr.length;
      const avgRating = ratingCount > 0 ? ratingsArr.reduce((a, b) => a + (b || 0), 0) / ratingCount : 0;
      // 2. Build ratings breakdown (e.g., { '1': 2, '2': 5, ... })
      const ratingsBreakdown: Record<string, number> = {};
      for (const r of ratingsArr) {
        if (typeof r === 'number') {
          const key = r.toString();
          ratingsBreakdown[key] = (ratingsBreakdown[key] || 0) + 1;
        }
      }
      // 3. Count added_by_status
      const addedByStatus: Record<string, number> = {};
      for (const ug of allUserGames) {
        if (ug.status) {
          addedByStatus[ug.status] = (addedByStatus[ug.status] || 0) + 1;
        }
      }
      // 4. Update the Game table
      await prisma.game.update({
        where: { id: gameId },
        data: {
          rating: avgRating,
          ratings_count: ratingCount,
          ratings: ratingsBreakdown,
          added: ratingCount, // or allUserGames.length
          added_by_status: addedByStatus
        }
      });

      res.status(200).json({ message: 'Rating submitted successfully' });
    } catch (error) {
      console.error('Error handling rating:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Get a specific game's data for a user
  getUserGame: async (req: Request, res: Response) => {
    const { userId, gameId } = req.params;
    console.log("Request to /api/userGames/:userId/games/:gameId");

    try {
      const userGame = await prisma.userGame.findUnique({
        where: {
          userId_gameId: {
            userId: parseInt(userId),
            gameId: parseInt(gameId)
          }
        },
        select: {
          rating: true,
          status: true
        }
      });

      if (!userGame) {
        return res.json({ user_rating: null, user_status: null });
      }

      res.status(200).json({
        user_rating: userGame.rating,
        user_status: userGame.status
      });
    } catch (error) {
      console.error('Error retrieving game data for user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Delete a game from user's collection
  deleteUserGame: async (req: Request, res: Response) => {
    const { userId, gameId } = req.params;
    console.log("Request to delete game from user's collection:", { userId, gameId });

    try {
      await prisma.userGame.delete({
        where: {
          userId_gameId: {
            userId: parseInt(userId),
            gameId: parseInt(gameId)
          }
        }
      });

      // Update aggregate fields in the Game table after removal
      const allUserGames = await prisma.userGame.findMany({
        where: { gameId: parseInt(gameId) },
        select: { rating: true, status: true }
      });
      const ratingsArr = allUserGames.map(ug => ug.rating).filter(r => typeof r === 'number');
      const ratingCount = ratingsArr.length;
      const avgRating = ratingCount > 0 ? ratingsArr.reduce((a, b) => a + (b || 0), 0) / ratingCount : 0;
      const ratingsBreakdown: Record<string, number> = {};
      for (const r of ratingsArr) {
        if (typeof r === 'number') {
          const key = r.toString();
          ratingsBreakdown[key] = (ratingsBreakdown[key] || 0) + 1;
        }
      }
      const addedByStatus: Record<string, number> = {};
      for (const ug of allUserGames) {
        if (ug.status) {
          addedByStatus[ug.status] = (addedByStatus[ug.status] || 0) + 1;
        }
      }
      await prisma.game.update({
        where: { id: parseInt(gameId) },
        data: {
          rating: avgRating,
          ratings_count: ratingCount,
          ratings: ratingsBreakdown,
          added: ratingCount,
          added_by_status: addedByStatus
        }
      });

      res.status(200).json({ message: 'Game removed from collection successfully' });
    } catch (error) {
      if (typeof error === 'object' && error !== null && 'code' in error && (error as any).code === 'P2025') {
        return res.status(404).json({ message: 'Game not found in user collection' });
      }
      console.error('Error removing game from collection:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Get user anime
  getUserAnimes: async (req: Request, res: Response) => {
    const { userId } = req.params;
    console.log("Request to /api/userAnime/:userId/anime");
    console.log("User ID from params:", userId);

    try {
      const userAnime = await prisma.userAnime.findMany({
        where: { userId: parseInt(userId) },
        include: {
          anime: true,
        }
      });

      if (!userAnime || userAnime.length === 0) {
        return res.json([]);
      }

      const combinedAnime = userAnime.map((userAnimeEntry) => ({
        ...userAnimeEntry.anime,
        user_rating: userAnimeEntry.rating,
        user_status: userAnimeEntry.status
      }));

      res.status(200).json(combinedAnime);
    } catch (error) {
      console.error('Error retrieving user anime:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Submit or update a rating for anime
  submitAnimeRating: async (req: Request<object, {}, animeRatingRequest>, res: Response) => {
    const { username, animeId, rating, status } = req.body;
    console.log("Request to /api/userAnime/ratings");

    try {
      const user = await prisma.user.findUnique({
        where: { username }
      });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Upsert the user's rating/status for the anime
      await prisma.userAnime.upsert({
        where: {
          userId_animeId: {
            userId: user.id,
            animeId: animeId
          }
        },
        update: {
          rating,
          status
        },
        create: {
          userId: user.id,
          animeId: animeId,
          rating,
          status
        }
      });

      // After upserting the userAnime entry, update the user's aggregate counts
      const [gameReviewsCount, animeReviewsCount] = await Promise.all([
        prisma.userGame.count({
          where: {
            userId: user.id,
            rating: { not: null }
          }
        }),
        prisma.userAnime.count({
          where: {
            userId: user.id,
            rating: { not: null }
          }
        })
      ]);

      await prisma.user.update({
        where: { id: user.id },
        data: {
          game_reviews_count: gameReviewsCount,
          anime_reviews_count: animeReviewsCount,
          total_reviews_count: gameReviewsCount + animeReviewsCount
        }
      });

      // Update aggregate site fields in the Anime table
      // 1. Get all user ratings for this anime
      const allUserAnimes = await prisma.userAnime.findMany({
        where: { animeId: animeId },
        select: { rating: true, status: true }
      });
      const ratingsArr = allUserAnimes.map(ua => ua.rating).filter(r => typeof r === 'number');
      const ratingCount = ratingsArr.length;
      const avgRating = ratingCount > 0 ? ratingsArr.reduce((a, b) => a + (b || 0), 0) / ratingCount : 0;
      // 2. Build ratings breakdown (e.g., { '1': 2, '2': 5, ... })
      const ratingsBreakdown: Record<string, number> = {};
      for (const r of ratingsArr) {
        if (typeof r === 'number') {
          const key = r.toString();
          ratingsBreakdown[key] = (ratingsBreakdown[key] || 0) + 1;
        }
      }
      // 3. Count added_by_status
      const addedByStatus: Record<string, number> = {};
      for (const ua of allUserAnimes) {
        if (ua.status) {
          addedByStatus[ua.status] = (addedByStatus[ua.status] || 0) + 1;
        }
      }
      // 4. Update the Anime table (site aggregate fields only)
      await prisma.anime.update({
        where: { id: animeId },
        data: {
          site_rating: avgRating,
          site_ratings_count: ratingCount,
          site_ratings: ratingsBreakdown,
          site_reviews_count: 0, // update if/when you add reviews
          site_added: ratingCount,
          site_added_by_status: addedByStatus
        }
      });

      res.status(200).json({ message: 'Anime rating submitted successfully' });
    } catch (error) {
      console.error('Error submitting anime rating:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
  getUserAnime: async (req: Request, res: Response) => {
    const { userId, animeId } = req.params;
    console.log("Request to /api/userAnime/:userId/anime/:animeId");

    try {
      const userAnime = await prisma.userAnime.findUnique({
        where: {
          userId_animeId: {
            userId: parseInt(userId),
            animeId: parseInt(animeId)
          }
        },
        select: {
          rating: true,
          status: true
        }
      });

      if (!userAnime) {
        return res.json({ user_rating: null, user_status: null });
      }

      res.status(200).json({
        user_rating: userAnime.rating,
        user_status: userAnime.status
      });

      console.log("User anime data retrieved successfully:", userAnime);
    } catch (error) {
      console.error('Error retrieving anime data for user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
  deleteUserAnime: async (req: Request, res: Response) => {
    const { userId, animeId } = req.params;
    console.log("Request to delete anime from user's collection:", { userId, animeId });
    try {
      await prisma.userAnime.delete({
        where: {
          userId_animeId: {
            userId: parseInt(userId),
            animeId: parseInt(animeId)
          }
        }
      });

      // Update aggregate fields in the Anime table after removal
      const allUserAnimes = await prisma.userAnime.findMany({
        where: { animeId: parseInt(animeId) },
        select: { rating: true, status: true }
      });
      const ratingsArr = allUserAnimes.map(ua => ua.rating).filter(r => typeof r === 'number');
      const ratingCount = ratingsArr.length;
      const avgRating = ratingCount > 0 ? ratingsArr.reduce((a, b) => a + (b || 0), 0) / ratingCount : 0;
      const ratingsBreakdown: Record<string, number> = {};
      for (const r of ratingsArr) {
        if (typeof r === 'number') {
          const key = r.toString();
          ratingsBreakdown[key] = (ratingsBreakdown[key] || 0) + 1;
        }
      }
      const addedByStatus: Record<string, number> = {};
      for (const ua of allUserAnimes) {
        if (ua.status) {
          addedByStatus[ua.status] = (addedByStatus[ua.status] || 0) + 1;
        }
      }
      await prisma.anime.update({
        where: { id: parseInt(animeId) },
        data: {
          site_rating: avgRating,
          site_ratings_count: ratingCount,
          site_ratings: ratingsBreakdown,
          site_reviews_count: 0, // update if/when you add reviews
          site_added: ratingCount,
          site_added_by_status: addedByStatus
        }
      });

      res.status(200).json({ message: 'Anime removed from collection successfully' });
    } catch (error) {
      if (typeof error === 'object' && error !== null && 'code' in error && (error as any).code === 'P2025') {
        return res.status(404).json({ message: 'Anime not found in user collection' });
      }
      console.error('Error removing anime from collection:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};
