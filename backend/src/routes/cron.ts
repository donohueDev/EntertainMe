import { Router } from 'express';
import { cronController } from '../controllers/cronController';

const router = Router();

// This endpoint will be called by Vercel's cron job
router.get('/', async (req, res) => {
    try {
        // Verify the request is coming from Vercel
        const authHeader = req.headers.authorization;
        if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        console.log('Starting cron job to update top games and anime...');
        
        try {
            // Update top games
            await cronController.updateTopGamesInternal();
            console.log('Successfully updated top games');
            
            // Wait 1 second to respect API rate limits
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Update top anime
            await cronController.updateTopAnimeInternal();
            console.log('Successfully updated top anime');
            
            console.log('Cron job executed successfully');
            res.status(200).json({ success: true, message: 'Successfully updated top games and anime' });
        } catch (error) {
            console.error('Error in cron job:', error);
            res.status(500).json({ error: 'Failed to update top content' });
        }
    } catch (error) {
        console.error('Cron job failed:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Test endpoint for the cron job (only available in development)
router.post('/test', async (req, res) => {
    try {
        if (process.env.NODE_ENV === 'production') {
            return res.status(403).json({ error: 'Test endpoint not available in production' });
        }

        console.log('Starting test cron job to update top games and anime...');
        
        try {
            // Update top games
            await cronController.updateTopGamesInternal();
            console.log('Successfully updated top games');
            
            // Wait 1 second to respect API rate limits
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Update top anime
            await cronController.updateTopAnimeInternal();
            console.log('Successfully updated top anime');
            
            console.log('Test cron job executed successfully');
            res.status(200).json({ success: true, message: 'Successfully updated top games and anime' });
        } catch (error) {
            console.error('Error in test cron job:', error);
            res.status(500).json({ error: 'Failed to update top content' });
        }
    } catch (error) {
        console.error('Test cron job failed:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
