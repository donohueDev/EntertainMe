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
const database_1 = require("../database/database");
const router = express_1.default.Router();
let db;
// Initialize database connection
(0, database_1.initDatabase)().then((database) => {
    db = database;
}).catch((error) => {
    console.error('Failed to initialize database:', error);
});
// Get top 100 games
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!db) {
        res.status(500).json({ error: 'Database not initialized' });
        return;
    }
    try {
        const sql = `
      SELECT t.*, g.*
      FROM top_100_games t
      JOIN games g ON t.game_id = g.id
      ORDER BY t.rank ASC
      LIMIT 100;
    `;
        db.all(sql, [], (err, rows) => {
            if (err) {
                console.error('Error fetching top 100 games:', err);
                res.status(500).json({ error: 'Database error' });
                return;
            }
            const top100Games = rows.map(row => ({
                id: row.id,
                game_id: row.game_id,
                rank: row.rank,
                value: row.value,
                created_at: row.created_at,
                game: {
                    id: row.game_id,
                    name: row.name,
                    slug: row.slug,
                    released: row.released,
                    tba: row.tba,
                    background_image: row.background_image,
                    rating: row.rating,
                    rating_top: row.rating_top,
                    ratings_count: row.ratings_count,
                    reviews_text_count: row.reviews_text_count,
                    added: row.added,
                    metacritic: row.metacritic,
                    playtime: row.playtime,
                    suggestions_count: row.suggestions_count,
                    updated: row.updated,
                    user_game: row.user_game,
                    reviews_count: row.reviews_count,
                    saturated_color: row.saturated_color,
                    dominant_color: row.dominant_color,
                    esrb_rating: row.esrb_rating,
                    description_raw: row.description_raw
                }
            }));
            res.json(top100Games);
        });
    }
    catch (error) {
        console.error('Error handling request:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
// Update top 100 games
router.post('/update', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!db) {
        res.status(500).json({ error: 'Database not initialized' });
        return;
    }
    try {
        const { games } = req.body;
        if (!Array.isArray(games)) {
            return res.status(400).json({ error: 'Invalid request body' });
        }
        // Start a transaction
        db.serialize(() => {
            db.run('BEGIN TRANSACTION');
            // Clear existing top 100 games
            db.run('DELETE FROM top_100_games', (err) => {
                if (err) {
                    console.error('Error clearing top 100 games:', err);
                    db.run('ROLLBACK');
                    res.status(500).json({ error: 'Database error' });
                    return;
                }
                // Insert new top 100 games
                const stmt = db.prepare('INSERT INTO top_100_games (game_id, rank, value) VALUES (?, ?, ?)');
                let completed = 0;
                const total = games.length;
                games.forEach((game, index) => {
                    stmt.run([game.id, index + 1, game.value], (err) => {
                        if (err) {
                            console.error('Error inserting game:', err);
                            db.run('ROLLBACK');
                            res.status(500).json({ error: 'Database error' });
                            return;
                        }
                        completed++;
                        if (completed === total) {
                            stmt.finalize();
                            db.run('COMMIT', (err) => {
                                if (err) {
                                    console.error('Error committing transaction:', err);
                                    db.run('ROLLBACK');
                                    res.status(500).json({ error: 'Database error' });
                                    return;
                                }
                                res.json({ message: 'Top 100 games updated successfully' });
                            });
                        }
                    });
                });
            });
        });
    }
    catch (error) {
        console.error('Error handling request:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
exports.default = router;
