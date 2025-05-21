import { initDatabase } from '../database/database.js';

const db = initDatabase();

export const getAnimes = (req, res) => {
  try {
    const { page = 1, limit = 20, sortField = 'title_romaji', sortOrder = 'asc' } = req.query;

    const validSortFields = ['title_romaji', 'updated_at', 'rating', 'popularity'];
    const validSortOrders = ['asc', 'desc'];

    if (!validSortFields.includes(sortField) || !validSortOrders.includes(sortOrder.toLowerCase())) {
      return res.status(400).json({ error: 'Invalid sort parameters' });
    }

    const offset = (page - 1) * limit;

    const query = `
      SELECT * FROM animes 
      ORDER BY ${sortField} ${sortOrder.toUpperCase()} 
      LIMIT ? OFFSET ?
    `;
    db.all(query, [limit, offset], (err, rows) => {
      if (err) {
        console.error('Error fetching animes:', err);
        return res.status(500).json({ error: 'Failed to fetch animes' });
      }
      res.status(200).json({ animes: rows });
    });
  } catch (error) {
    console.error('Error fetching animes:', error);
    res.status(500).json({ error: 'Failed to fetch animes' });
  }
};

export const getAnimeByID = (req, res) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id) || id <= 0) {
      return res.status(400).json({ error: 'Invalid anime ID' });
    }

    db.get('SELECT * FROM animes WHERE id = ?', [id], (err, anime) => {
      if (err) {
        console.error('Error fetching anime:', err);
        return res.status(500).json({ error: 'Failed to fetch anime' });
      }

      if (!anime) {
        return res.status(404).json({ error: 'Anime not found' });
      }

      res.status(200).json(anime);
    });
  } catch (error) {
    console.error('Error fetching anime:', error);
    res.status(500).json({ error: 'Failed to fetch anime' });
  }
};

export const getAnimeByUpdateDate = (req, res) => {
  try {
    db.all('SELECT id, title_romaji, cover_image FROM animes ORDER BY updated_at DESC LIMIT 100', [], (err, animes) => {
      if (err) {
        console.error('Error fetching animes by update date:', err);
        return res.status(500).json({ error: 'Failed to fetch recently updated animes' });
      }

      res.status(200).json({ animes });
    });
  } catch (error) {
    console.error('Error fetching animes by update date:', error);
    res.status(500).json({ error: 'Failed to fetch recently updated animes' });
  }
};
