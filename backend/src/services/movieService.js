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
export { getPopularMovies as getPopularMovies };
// service to be used when movie implementation is needed
const axios_1 = __importDefault(require("axios"));
// Function to fetch popular movies from TMDb
const getPopularMovies = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.get('https://api.themoviedb.org/3/movie/popular', {
        params: {
            api_key: process.env.TMDB_API_KEY,
            language: 'en-US',
            page: 1
        }
    });
    return response.data.results;
});
const _getPopularMovies = getPopularMovies;
export { _getPopularMovies as getPopularMovies };
