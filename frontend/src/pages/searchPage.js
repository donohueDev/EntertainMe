import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
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
      const response = await axios.get(`http://localhost:3001/api/games/search`, {
        params: { query: text },
      });
      setResults(response.data.games);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const handleGameClick = (game) => {
    navigate('/game', { state: { game } });
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 3, bgcolor: 'background.paper' }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Search Games
        </Typography>

        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Type game name..."
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
          {results.map((game) => (
            <ListItem key={game.id} disablePadding divider>
              <ListItemButton onClick={() => handleGameClick(game)}>
                <ListItemText 
                  primary={game.name}
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
