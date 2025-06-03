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

// Calculate how relevant a result is to the search query
const calculateRelevanceScore = (title, query) => {
  const normalizedTitle = title.toLowerCase();
  const normalizedQuery = query.toLowerCase();

  // Exact match gets highest score
  if (normalizedTitle === normalizedQuery) return 100;
  
  // Start of title match gets high score
  if (normalizedTitle.startsWith(normalizedQuery)) return 80;

  // Word boundary match gets medium score
  if (normalizedTitle.includes(` ${normalizedQuery}`)) return 60;

  // Contains match gets lower score
  if (normalizedTitle.includes(normalizedQuery)) return 40;

  // Partial word match gets lowest score
  return 20;
};

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
      const validGameResults = response.data.filter(item => item != null)
        .map(game => ({ 
          ...game, 
          type: 'game',
          displayName: game.name,
          // Calculate relevance score based on exact matches and position of query in name
          relevance: calculateRelevanceScore(game.name, text)
        }))
        .slice(0, 5); // Limit to top 5 games

      const validAnimeResults = animeResponse.data.filter(item => item != null)
        .map(anime => ({ 
          ...anime, 
          type: 'anime',
          displayName: anime.title,
          relevance: calculateRelevanceScore(anime.title, text)
        }))
        .slice(0, 5); // Limit to top 5 anime

      // Combine and sort by relevance score
      const combinedResults = [...validGameResults, ...validAnimeResults]
        .sort((a, b) => {
          // First sort by relevance score
          if (b.relevance !== a.relevance) {
            return b.relevance - a.relevance;
          }
          // If same relevance, sort alphabetically
          return a.displayName.localeCompare(b.displayName);
        })
        .slice(0, 10); // Show max 10 total results

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
      <Paper elevation={3} sx={{ 
        p: 4, 
        bgcolor: '#051426',
        borderRadius: 2,
        border: '1px solid rgba(218, 165, 32, 0.3)',
        boxShadow: '0 0 15px rgba(218, 165, 32, 0.1)'
      }}>
        <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ 
          mb: 4, 
          color: 'white',
          fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
          fontWeight: 'bold',
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          background: 'linear-gradient(to bottom, #FFFFFF 0%, goldenrod 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          textFillColor: 'transparent',
          WebkitTextFillColor: 'transparent',
          textShadow: '0 0 20px rgba(218, 165, 32, 0.5)',
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: '-10px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '60%',
            height: '2px',
            background: 'linear-gradient(90deg, transparent, goldenrod, transparent)'
          }
        }}>
          Discover Content
        </Typography>

        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search for games, anime, and more..."
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'goldenrod' }} />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'rgba(218, 165, 32, 0.5)',
                },
                '&:hover fieldset': {
                  borderColor: 'goldenrod',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'goldenrod',
                },
              },
              '& .MuiInputBase-input': {
                color: 'white',
              },
              '& .MuiInputBase-input::placeholder': {
                color: 'rgba(255, 255, 255, 0.7)',
                opacity: 1,
              },
            }}
          />
        </Box>

        <List sx={{ 
          mt: 2,
          borderRadius: 1,
          '& .MuiListItem-root': {
            borderBottom: '1px solid rgba(218, 165, 32, 0.2)',
            '&:last-child': {
              borderBottom: 'none'
            }
          }
        }}>
          {results.map((result) => (
            <ListItem key={result.type + '-' + result.id} disablePadding>
              <ListItemButton 
                onClick={() => handleItemClick(result)}
                sx={{
                  borderRadius: 1,
                  '&:hover': {
                    bgcolor: 'rgba(218, 165, 32, 0.08)',
                  }
                }}
              >
                <ListItemText 
                  primary={result.displayName}
                  secondary={result.type.charAt(0).toUpperCase() + result.type.slice(1)}
                  primaryTypographyProps={{
                    sx: { 
                      color: 'white',
                      fontWeight: 'medium'
                    }
                  }}
                  secondaryTypographyProps={{
                    sx: { 
                      color: 'goldenrod',
                      fontSize: '0.8rem'
                    }
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
          {query.length > 0 && results.length === 0 && (
            <Typography 
              variant="body1" 
              align="center" 
              sx={{ 
                color: 'rgba(255, 255, 255, 0.7)', 
                mt: 2,
                fontStyle: 'italic'
              }}
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
