import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export default prisma;

interface RatingRequest {
  username: string;
  gameId: number;
  rating: number;
  status: string;
}

export const userGamesController = {
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
  submitRating: async (req: Request<object, {}, RatingRequest>, res: Response) => {
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
  }
};
