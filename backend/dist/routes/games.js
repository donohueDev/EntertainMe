"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const database_1 = require("../database/database");
const router = express_1.default.Router();
// Function to process and insert game data into the database
const processGameData = (game) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const db = (0, database_1.getDatabase)();
        // Check if the required properties exist on the game object
        if (!game || !game.id || !game.slug || !game.name) {
            console.error('Skipping invalid game data:', game);
            return;
        }
        // Fetch detailed game information
        const { data: detailedGame } = yield axios_1.default.get(`https://api.rawg.io/api/games/${game.id}`, {
            params: { key: process.env.RAWG_API_KEY }
        });
        // Check if the game already exists in the database
        const existingGame = yield new Promise((resolve, reject) => {
            db.get('SELECT id FROM games WHERE id = ?', [game.id], (err, row) => {
                if (err)
                    reject(err);
                else
                    resolve(row);
            });
        });
        // If the game already exists, skip the insertion
        if (existingGame) {
            console.log(`Game with ID ${game.id} already exists in the database.`);
            return;
        }
        // Insert the game data
        const stmt = db.prepare(`
      INSERT INTO games (
        id, slug, name, released, tba, background_image, rating, rating_top, ratings_count,
        reviews_text_count, added, metacritic, playtime, suggestions_count,
        updated, user_game, reviews_count, saturated_color, dominant_color, esrb_rating, description_raw
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
        stmt.run(detailedGame.id, detailedGame.slug, detailedGame.name, detailedGame.released, detailedGame.tba, detailedGame.background_image, detailedGame.rating, detailedGame.rating_top, detailedGame.ratings_count, detailedGame.reviews_text_count, detailedGame.added, detailedGame.metacritic, detailedGame.playtime, detailedGame.suggestions_count, detailedGame.updated, detailedGame.user_game, detailedGame.reviews_count, detailedGame.saturated_color, detailedGame.dominant_color, detailedGame.esrb_rating ? detailedGame.esrb_rating.name : null, detailedGame.description_raw || detailedGame.description);
        console.log(`Successfully inserted game ${detailedGame.name}`);
    }
    catch (error) {
        console.error('Error processing game data:', error);
        throw error;
    }
});
// POST request to fetch and insert games from the RAWG API
router.post('/rawg-games', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let page = 1;
        const pageSize = 100;
        let totalGamesInserted = 0;
        const targetGames = 10;
        while (totalGamesInserted < targetGames) {
            const { data } = yield axios_1.default.get('https://api.rawg.io/api/games', {
                params: { key: process.env.RAWG_API_KEY, page, page_size: pageSize },
            });
            const games = data.results;
            if (!games.length)
                break;
            yield Promise.all(games.map((game) => __awaiter(void 0, void 0, void 0, function* () {
                try {
                    yield processGameData(game);
                    totalGamesInserted++;
                }
                catch (err) {
                    console.error(`Failed to insert game ${game.id}:`, err instanceof Error ? err.message : 'Unknown error');
                }
            })));
            console.log(`Inserted ${totalGamesInserted} games so far.`);
            if (totalGamesInserted >= targetGames) {
                break;
            }
            page++;
        }
        res.status(200).json({ message: `Successfully inserted ${totalGamesInserted} games!` });
    }
    catch (error) {
        console.error('Error fetching or inserting games:', error);
        res.status(500).json({ error: 'Failed to fetch games' });
    }
}));
// GET all games
router.get('/', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const db = (0, database_1.getDatabase)();
        const sql = 'SELECT * FROM games ORDER BY rating DESC;';
        db.all(sql, [], (err, rows) => {
            if (err) {
                console.error('Error fetching games:', err);
                res.status(500).json({ error: 'Database error' });
                return;
            }
            console.log('Found games:', rows.length);
            res.json(rows);
        });
    }
    catch (error) {
        console.error('Error handling request:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
// Test route to check database connection
router.get('/test', (_req, res) => {
    try {
        const db = (0, database_1.getDatabase)();
        db.get('SELECT COUNT(*) as count FROM games', [], (err, row) => {
            if (err) {
                console.error('Error checking games count:', err);
                res.status(500).json({ error: 'Database error' });
                return;
            }
            res.json({ message: 'Database is working', gamesCount: row.count });
        });
    }
    catch (error) {
        console.error('Error in test route:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.default = router;
