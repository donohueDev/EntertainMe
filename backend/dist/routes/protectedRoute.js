"use strict";
// protectedRoute.ts initially used with jwt but was having issues 
// pivoted to a more basic implementation of user authorization for now
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv = __importStar(require("dotenv"));
const protectedRoute = (req, res, next) => {
    const authHeader = req.headers.authorization;
    dotenv.config();
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }
    const token = authHeader.split(' ')[1]; // Extract the token from the Authorization header
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: Token is missing' });
    }
    try {
        // Verify the token using the JWT secret
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        // Extract the user ID from the decoded payload
        const userId = decoded.userId; // Assuming the JWT contains a userId field
        req.user = decoded; // Attach the decoded payload to req.user
        req.userId = userId; // Optionally attach the userId directly to req
        console.log("Decoded user: ", req.userId);
        next(); // Continue to the route handler
    }
    catch (error) {
        console.error('Token verification failed:', error);
        res.status(403).json({ message: 'Forbidden: Invalid token' });
    }
};
exports.default = protectedRoute;
