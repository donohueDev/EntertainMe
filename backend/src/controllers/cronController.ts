import { Request, Response } from 'express';
import { gamesController } from './gamesController';
import { animeController } from './animeController';

// Create mock response object that captures the response data without sending it
const createMockResponse = () => {
    let responseData: any = null;
    let responseStatus = 200;
    
    return {
        status: function(status: number) { 
            responseStatus = status;
            return this;
        },
        json: function(data: any) {
            responseData = data;
            return this;
        },
        send: function(data: any) {
            responseData = data;
            return this;
        },
        getResult: function() {
            return { status: responseStatus, data: responseData };
        }
    } as Partial<Response>;
};

export const cronController = {
    updateTopGamesInternal: async () => {
        const mockReq = {} as Request;
        const mockRes = createMockResponse();
        
        await gamesController.updateTopGames(mockReq, mockRes as Response);
        const result = (mockRes as any).getResult();
        
        if (result.status !== 200) {
            throw new Error(`Failed to update top games: ${JSON.stringify(result.data)}`);
        }
        return result.data;
    },

    updateTopAnimeInternal: async () => {
        const mockReq = {} as Request;
        const mockRes = createMockResponse();
        
        await animeController.updateTopAnime(mockReq, mockRes as Response);
        const result = (mockRes as any).getResult();
        
        if (result.status !== 200) {
            throw new Error(`Failed to update top anime: ${JSON.stringify(result.data)}`);
        }
        return result.data;
    }
};
