"use strict";
// movies.ts will be used to implement movie side of app
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const movieService_1 = require("../services/movieService");
const router = (0, express_1.Router)();
router.get('/movies', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const movies = yield (0, movieService_1.getPopularMovies)();
        res.json(movies);
    }
    catch (error) {
        console.error('Error fetching movies:', error);
        res.status(500).json({ error: 'Error fetching movies' });
    }
}));
exports.default = router;
