import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

// Validation schema for profile updates
const profileUpdateSchema = z.object({
  display_name: z.string().min(1).max(50).optional(),
  avatar_url: z.string().url().optional(),
  bio: z.string().max(500).optional(),
  location: z.string().max(100).optional(),
  website: z.string().url().optional(),
  preferences: z.record(z.any()).optional(),
  content_filters: z.record(z.any()).optional(),
});

export const getProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        email: true,
        display_name: true,
        avatar_url: true,
        bio: true,
        location: true,
        website: true,
        created_at: true,
        last_activity: true,
        preferences: true,
        content_filters: true,
        anime_reviews_count: true,
        game_reviews_count: true,
        total_reviews_count: true,
        watching_anime_count: true,
        completed_anime_count: true,
        planned_anime_count: true,
        dropped_anime_count: true,
        playing_games_count: true,
        completed_games_count: true,
        planned_games_count: true,
        dropped_games_count: true,
      },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Validate input
    const validationResult = profileUpdateSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({
        message: 'Invalid input',
        errors: validationResult.error.errors,
      });
    }

    // Update last_activity
    const updateData = {
      ...validationResult.data,
      last_activity: new Date(),
    };

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
      select: {
        id: true,
        username: true,
        email: true,
        display_name: true,
        avatar_url: true,
        bio: true,
        location: true,
        website: true,
        created_at: true,
        last_activity: true,
        preferences: true,
        content_filters: true,
      },
    });

    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
