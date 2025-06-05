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
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const client_1 = require("@prisma/client");
const games_1 = __importDefault(require("./routes/games"));
const auth_1 = require("./routes/auth");
const userGames_1 = __importDefault(require("./routes/userGames"));
const userAnime_1 = __importDefault(require("./routes/userAnime"));
const anime_1 = __importDefault(require("./routes/anime"));
const profile_1 = __importDefault(require("./routes/profile"));
const cron_1 = __importDefault(require("./routes/cron"));
// import searchRouter from '../routes/search';
// import moviesRouter from '../routes/movies';
// import showsRouter from '../routes/shows';
// import protectedRoute from '../routes/protectedRoute';
// Load environment variables from root directory
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../../.env') });
const app = (0, express_1.default)();
const PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 5001;
const NODE_ENV = (_b = process.env.NODE_ENV) !== null && _b !== void 0 ? _b : 'development';
// Initialize Prisma Client
const prisma = new client_1.PrismaClient();
// Add request logging middleware only for non-production environments
if (NODE_ENV !== 'production') {
    app.use((req, res, next) => {
        console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
        next();
    });
}
// Configure CORS
const allowedOrigins = NODE_ENV === 'production'
    ? [
        'https://entertainmentme.onrender.com',
        'http://localhost:3000',
        'https://entertain-me-chi.vercel.app',
        'https://www.entertainme.pro',
        'https://entertainme.pro'
    ]
    : ['http://localhost:3000'];
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        // Only log CORS errors in development
        if (NODE_ENV !== 'production') {
            console.warn(`CORS blocked request from origin: ${origin}`);
        }
        return callback(new Error(`Origin ${origin} not allowed by CORS`));
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 204,
    maxAge: 86400
}));
// Handle preflight requests explicitly
app.options('*', (0, cors_1.default)());
// Middleware
app.use(express_1.default.json());
// Error handling middleware
app.use((err, req, res, next) => {
    // Log error details in any environment, but clean them up for production
    const errorDetails = Object.assign({ message: err.message, url: req.url, method: req.method }, (NODE_ENV !== 'production' && { stack: err.stack }));
    console.error('Error:', errorDetails);
    res.status(500).json({
        message: 'Something went wrong!',
        error: NODE_ENV === 'development' ? err.message : 'Internal server error'
    });
});
// Set up the routes
app.use('/api/games', games_1.default);
app.use('/api/userGames', userGames_1.default);
app.use('/api/accounts', auth_1.accountRouter);
app.use('/api/anime', anime_1.default);
app.use('/api/userAnimes', userAnime_1.default);
app.use('/api/profile', profile_1.default);
app.use('/api/cron', cron_1.default);
// app.use('/api/search', searchRouter);
// app.use('/api/movies', moviesRouter);
// app.use('/api/shows', showsRouter);
// app.use('/api/protected', protectedRoute);
// Health check route
app.get('/health', (req, res) => {
    res.json({ status: 'ok', environment: NODE_ENV });
});
// Ping route to keep service alive
app.get('/ping', (req, res) => {
    res.status(200).send('pong');
});
// Basic route
app.get('/', (req, res) => {
    var _a;
    res.json({
        message: 'Welcome to the Entertainment API',
        environment: NODE_ENV,
        version: (_a = process.env.npm_package_version) !== null && _a !== void 0 ? _a : '1.0.0'
    });
});
// Start server and check Prisma connection
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield prisma.$connect();
            app.listen(PORT, () => {
                console.log(`Server started in ${NODE_ENV} mode on port ${PORT}`);
                // Only log detailed env info in development
                if (NODE_ENV !== 'production') {
                    console.log('Environment:', {
                        NODE_ENV,
                        PORT,
                        DB_HOST: process.env.DB_HOST,
                        DB_NAME: process.env.DB_NAME
                    });
                }
            });
        }
        catch (error) {
            console.error('Failed to start server:', error);
            process.exit(1);
        }
    });
}
startServer();
