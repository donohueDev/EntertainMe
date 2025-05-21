"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const games_1 = __importDefault(require("./routes/games"));
const accounts_1 = require("./routes/accounts");
const userGames_1 = __importDefault(require("./routes/userGames"));
const top100Games_1 = __importDefault(require("./routes/top100Games"));
// import animeRouter from '../routes/anime';
// import searchRouter from '../routes/search';
// import moviesRouter from '../routes/movies';
// import showsRouter from '../routes/shows';
// import protectedRoute from '../routes/protectedRoute';
const database_1 = require("./database/database");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
// Configure CORS
const corsOptions = {
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000'], // Add your frontend URLs
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};
// Enable CORS with options
app.use((0, cors_1.default)(corsOptions));
// Middleware
app.use(express_1.default.json());
// Set up the routes
app.use('/api/games', games_1.default);
app.use('/api/userGames', userGames_1.default);
app.use('/api/accounts', accounts_1.accountRouter);
app.use('/api/top100games', top100Games_1.default);
// app.use('/api/anime', animeRouter);
// app.use('/api/search', searchRouter);
// app.use('/api/movies', moviesRouter);
// app.use('/api/shows', showsRouter);
// app.use('/api/protected', protectedRoute);
// Basic route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the Entertainment API' });
});
// Initialize database when app starts
(0, database_1.initDatabase)()
    .then(() => {
    console.log('Database initialized successfully');
    // Start your server here
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
    .catch((error) => {
    console.error('Failed to initialize database:', error);
    process.exit(1);
});
