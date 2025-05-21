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
// Get all anime
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!db) {
        res.status(500).json({ error: 'Database not initialized' });
        return;
    }
    try {
        const sql = 'SELECT * FROM animes ORDER BY created_at DESC;';
        db.all(sql, [], (err, rows) => {
            if (err) {
                console.error('Error fetching anime:', err);
                res.status(500).json({ error: 'Database error' });
                return;
            }
            res.json(rows);
        });
    }
    catch (error) {
        console.error('Error handling request:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
exports.default = router;
