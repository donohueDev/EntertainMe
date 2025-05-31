import express from "express";
import { animeController } from "../controllers/animeController";

const router = express.Router();

// POST request to fetch and insert anime from the API
router.post("/anime", animeController.loadAnimeFromApi);

// GET all anime
router.get("/", animeController.getAllAnime);

// GET top 50 anime (must be before :id and :slug)
router.get("/top", animeController.getTop50Anime);

// Search anime by query
router.get("/search", animeController.searchAnime);

// GET anime by slug
router.get("/:slug", animeController.getAnimeBySlug);

// GET anime by ID
// router.get("/:id", animeController.getAnimeById);

// Update top anime
router.post("/update-top-anime", animeController.updateTopAnime);

export default router;
