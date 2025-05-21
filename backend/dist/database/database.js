"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initDatabase = initDatabase;
exports.getDatabase = getDatabase;
const sqlite3_1 = __importDefault(require("sqlite3"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
let db = null;
// Initialize the database connection
function initDatabase() {
    return new Promise((resolve, reject) => {
        try {
            // Get the absolute path to the project root
            const projectRoot = path_1.default.resolve(__dirname, '..', '..');
            const dbDir = path_1.default.join(projectRoot, 'data');
            console.log('Database directory:', dbDir);
            // Ensure the database directory exists
            if (!fs_1.default.existsSync(dbDir)) {
                console.log('Creating database directory...');
                fs_1.default.mkdirSync(dbDir, { recursive: true });
            }
            const dbPath = path_1.default.join(dbDir, 'games.db');
            console.log('Database path:', dbPath);
            const newDb = new sqlite3_1.default.Database(dbPath, (err) => {
                if (err) {
                    console.error('Error opening database:', err);
                    reject(err);
                    return;
                }
                // Create tables if they don't exist
                newDb.serialize(() => {
                    // Games table
                    newDb.run(`
            CREATE TABLE IF NOT EXISTS games (
              id INTEGER PRIMARY KEY,
              slug TEXT NOT NULL,
              name TEXT NOT NULL,
              released TEXT,
              tba INTEGER,
              background_image TEXT,
              rating REAL,
              rating_top INTEGER,
              ratings_count INTEGER,
              reviews_text_count INTEGER,
              added INTEGER,
              metacritic INTEGER,
              playtime INTEGER,
              suggestions_count INTEGER,
              updated TEXT,
              user_game INTEGER,
              reviews_count INTEGER,
              saturated_color TEXT,
              dominant_color TEXT,
              esrb_rating TEXT,
              description_raw TEXT
            )
          `, (err) => {
                        if (err) {
                            console.error('Error creating games table:', err);
                            reject(err);
                            return;
                        }
                        console.log('Games table created or already exists');
                    });
                });
                console.log('Database initialized successfully');
                db = newDb;
                resolve(newDb);
            });
        }
        catch (error) {
            console.error('Error in database initialization:', error);
            reject(error);
        }
    });
}
function getDatabase() {
    if (!db) {
        throw new Error('Database not initialized. Call initDatabase() first.');
    }
    return db;
}
