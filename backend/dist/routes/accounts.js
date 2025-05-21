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
exports.accountRouter = void 0;
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const sqlite3_1 = __importDefault(require("sqlite3"));
const sqlite_1 = require("sqlite");
const router = express_1.default.Router();
exports.accountRouter = router;
// Initialize SQLite connection
const dbPromise = (0, sqlite_1.open)({
    filename: './database/entertainme.db',
    driver: sqlite3_1.default.Database
});
// Register endpoint to create new user and add to database
router.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, username, password } = req.body;
    console.log("Request to /api/accounts/register");
    try {
        const db = yield dbPromise;
        // Check if the username already exists
        const existingUser = yield db.get('SELECT * FROM users WHERE username = ?', [username]);
        if (existingUser) {
            return res.status(400).json({ message: 'Username already taken. Please choose a different username.' });
        }
        // Check if the email already exists
        const existingEmail = yield db.get('SELECT * FROM users WHERE email = ?', [email]);
        if (existingEmail) {
            return res.status(400).json({ message: 'Email already registered. Please use a different email.' });
        }
        // Insert the new user into the database (password is stored in plain text)
        const result = yield db.run('INSERT INTO users (email, username, password) VALUES (?, ?, ?)', [email, username, password]);
        // Retrieve the userId of the newly inserted user
        const userId = result.lastID;
        // Send the response with userId and other necessary information
        return res.status(201).json({
            message: 'User registered successfully',
            userId: userId,
            username: username,
            email: email
        });
    }
    catch (error) {
        console.error('Registration failed:', error);
        return res.status(500).json({ message: 'Internal server error during registration' });
    }
}));
// Login endpoint 
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    console.log("Request to /api/accounts/login");
    try {
        const db = yield dbPromise;
        // Check if user exists
        const user = yield db.get('SELECT * FROM users WHERE username = ?', [username]);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Directly compare username and password (insecure for now)
        if (username === user.username && password === user.password) {
            console.log("Logging in with user:", user.id);
            return res.json({
                userId: user.id,
                username: user.username,
            });
        }
        else {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
    }
    catch (error) {
        console.error('Login failed:', error);
        return res.status(500).json({ message: 'Internal server error during login' });
    }
}));
// Protected route to get the current user's data
router.get('/me', (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Authorization header missing or malformed' });
    }
    const token = authHeader.split(' ')[1];
    console.log("Token received:", token);
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        console.log("returned: ", decoded.userId);
        return res.json({ userId: decoded.userId, username: decoded.username });
    }
    catch (error) {
        console.error('Token verification failed:', error);
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
});
