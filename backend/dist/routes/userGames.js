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
let db; // Using any temporarily to resolve the type issue
// Initialize database connection
(0, database_1.initDatabase)().then((database) => {
    db = database;
}).catch((error) => {
    console.error('Failed to initialize database:', error);
});
// Get games for a specific user by their ID (protected route)
router.get('/:userId/games', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    console.log("Request to /api/userGames/:userId/games");
    console.log("User ID from params:", userId);
    if (!db) {
        return res.status(500).json({ message: 'Database not initialized' });
    }
    try {
        const userGames = db.prepare('SELECT game_id, rating AS user_rating, status AS user_status FROM user_games WHERE user_id = ?').all(userId);
        console.log("User's games:", userGames);
        if (!userGames || userGames.length === 0) {
            return res.json([]);
        }
        const gameIds = userGames.map((game) => game.game_id);
        console.log("Game IDs:", gameIds);
        const games = db.prepare('SELECT * FROM games WHERE id IN (' + gameIds.map(() => '?').join(', ') + ')').all(...gameIds);
        console.log("Game details:", games);
        const combinedGames = games.map((game) => {
            const userGame = userGames.find((ug) => ug.game_id === game.id);
            return Object.assign(Object.assign({}, game), { user_rating: (userGame === null || userGame === void 0 ? void 0 : userGame.user_rating) || null, user_status: (userGame === null || userGame === void 0 ? void 0 : userGame.user_status) || null });
        });
        res.status(200).json(combinedGames);
    }
    catch (error) {
        console.error('Error retrieving games for user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}));
// Post route for submitting ratings
router.post('/ratings', (req, res) => {
    const { username, gameId, rating, status } = req.body;
    console.log("Request to /api/ratings");
    if (!db) {
        return res.status(500).json({ message: 'Database not initialized' });
    }
    try {
        const userRow = db.prepare('SELECT id FROM users WHERE username = ?').get(username);
        if (!userRow) {
            return res.status(404).json({ message: 'User not found' });
        }
        const userId = userRow.id;
        const existingRating = db.prepare('SELECT * FROM user_games WHERE user_id = ? AND game_id = ?').get(userId, gameId);
        if (existingRating) {
            db.prepare(`
        UPDATE user_games
        SET rating = ?, status = ?
        WHERE user_id = ? AND game_id = ?
      `).run(rating, status, userId, gameId);
            res.status(200).json({ message: 'Rating updated successfully' });
        }
        else {
            db.prepare(`
        INSERT INTO user_games (user_id, game_id, rating, status)
        VALUES (?, ?, ?, ?)
      `).run(userId, gameId, rating, status);
            res.status(200).json({ message: 'Rating submitted successfully' });
        }
    }
    catch (error) {
        console.error('Error handling rating:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.default = router;
