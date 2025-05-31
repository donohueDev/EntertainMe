import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from '../config';
import {
  Container,
  Box,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  InputAdornment
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async (text) => {
    setQuery(text);

    if (text.trim().length === 0) {
      setResults([]);
      return;
    }

    try {
      const response = await axios.get(`${API_BASE_URL}/api/games/search`, {
        params: { query: text },
      });
      const animeResponse = await axios.get(`${API_BASE_URL}/api/anime/search`, {
        params: { query: text },
      });

      // Filter out any null or undefined results before combining
      const validGameResults = response.data.filter(item => item != null);
      const validAnimeResults = animeResponse.data.filter(item => item != null);

      const combinedResults = [
        ...validGameResults.map(game => ({ ...game, type: 'game' })),
        ...validAnimeResults.map(anime => ({ ...anime, type: 'anime' }))
      ];

      // Add checks for the existence of the name property before sorting
      combinedResults.sort((a, b) => {
        const nameA = a?.name || ''; // Use empty string if name is missing
        const nameB = b?.name || '';
        return nameA.localeCompare(nameB);
      });

      setResults(combinedResults);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const handleItemClick = (item) => {
    if (item.type === 'game') {
      navigate(`/game/${item.id}`, { state: { game: item } });
    } else if (item.type === 'anime') {
      navigate(`/anime/${item.id}`, { state: { anime: item } });
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 3, bgcolor: 'background.paper' }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Search for Content!
        </Typography>

        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Type name of content..."
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <List>
          {results.map((result) => (
            <ListItem key={result.type + '-' + result.id} disablePadding divider>
              <ListItemButton onClick={() => handleItemClick(result)}>
                <ListItemText 
                  primary={result.type === 'game' ? result.name : result.title}
                  primaryTypographyProps={{
                    sx: { color: 'text.primary' }
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
          {query.length > 0 && results.length === 0 && (
            <Typography 
              variant="body1" 
              align="center" 
              sx={{ color: 'text.secondary', mt: 2 }}
            >
              No results found
            </Typography>
          )}
        </List>
      </Paper>
    </Container>
  );
};

export default SearchPage;
