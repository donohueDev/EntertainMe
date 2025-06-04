import { Router } from 'express';
import { cronController } from '../controllers/cronController';

const router = Router();
const NODE_ENV = process.env.NODE_ENV ?? 'development';

// This endpoint will be called by Vercel's cron job
router.get('/', async (req, res) => {
    try {
        // Verify the request is coming from Vercel
        const authHeader = req.headers.authorization;
        if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
            console.warn('Unauthorized cron job attempt detected');
            return res.status(401).json({ error: 'Unauthorized' });
        }

        try {
            // Update top games
            await cronController.updateTopGamesInternal();
            if (NODE_ENV !== 'production') {
                console.log('Top games update completed');
            }
            
            // Wait 1 second to respect API rate limits
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Update top anime
            await cronController.updateTopAnimeInternal();
            if (NODE_ENV !== 'production') {
                console.log('Top anime update completed');
            }

            return res.status(200).json({ 
                success: true, 
                message: 'Successfully updated top games and anime' 
            });
        } catch (error) {
            console.error('Cron job execution failed:', {
                error: error instanceof Error ? error.message : 'Unknown error',
                timestamp: new Date().toISOString()
            });
            return res.status(500).json({ error: 'Failed to update top content' });
        }
    } catch (error) {
        console.error('Cron job request handling failed:', {
            error: error instanceof Error ? error.message : 'Unknown error',
            timestamp: new Date().toISOString()
        });
        return res.status(500).json({ error: 'Internal server error' });
    }
});

// Test endpoint for the cron job (only available in development)
router.post('/test', async (req, res) => {
    if (NODE_ENV === 'production') {
        console.warn('Attempted to access test endpoint in production');
        return res.status(403).json({ error: 'Test endpoint not available in production' });
    }

    try {
        console.log('Starting test cron job execution...');
        
        try {
            // Update top games
            await cronController.updateTopGamesInternal();
            console.log('Test: Top games update completed');
            
            // Wait 1 second to respect API rate limits
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Update top anime
            await cronController.updateTopAnimeInternal();
            console.log('Test: Top anime update completed');
            
            return res.status(200).json({ 
                success: true, 
                message: 'Test cron job completed successfully' 
            });
        } catch (error) {
            console.error('Test cron job execution failed:', {
                error: error instanceof Error ? error.message : 'Unknown error',
                timestamp: new Date().toISOString()
            });
            return res.status(500).json({ error: 'Failed to update top content' });
        }
    } catch (error) {
        console.error('Test cron job request handling failed:', {
            error: error instanceof Error ? error.message : 'Unknown error',
            timestamp: new Date().toISOString()
        });
        return res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
