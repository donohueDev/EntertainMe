// Import necessary libraries and modules
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Container,
  Box,
  CircularProgress,
  Alert,
  Button
} from '@mui/material';

const API_BASE_URL = 'http://localhost:3001';

const HomePage = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGames = async () => {
      console.log('Fetching games...');
      try {
        // Fetch the most recently updated games from the server
        const response = await axios.get(`${API_BASE_URL}/api/games/`, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });
        console.log('Response:', response.data);
        if (response.data && Array.isArray(response.data)) {
          setGames(response.data);
        } else {
          console.log('No games found in response');
          setError('No games found. Please try again later.');
        }
      } catch (error) {
        console.error("Failed to fetch games:", error.message);
        if (error.response) {
          console.error("Error response:", error.response.data);
          console.error("Error status:", error.response.status);
        }
        setError('Failed to load games. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  const handleLoadGames = async () => {
    console.log('Loading games from RAWG...');
    try {
      const response = await axios.post(`${API_BASE_URL}/api/games/rawg-games`, {}, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      console.log('Load games response:', response.data);
      window.location.reload();
    } catch (error) {
      console.error('Failed to load games:', error.message);
      if (error.response) {
        console.error("Error response:", error.response.data);
        console.error("Error status:", error.response.status);
      }
      setError('Failed to load games. Please try again later.');
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
        <Button 
          variant="contained" 
          color="primary"
          onClick={handleLoadGames}
          sx={{ mt: 2 }}
        >
          Try Loading Games Again
        </Button>
      </Container>
    );
  }

  if (games.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="info" sx={{ mb: 2 }}>
          No games found. Click the button below to load some games from RAWG.
        </Alert>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Button 
            variant="contained" 
            color="primary"
            size="large"
            onClick={handleLoadGames}
            sx={{ 
              py: 2,
              px: 4,
              fontSize: '1.1rem'
            }}
          >
            Load Games from RAWG
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={3}>
        {games.map((game) => (
          <Grid item xs={12} sm={6} md={4} key={game.id}>
            <Card 
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                cursor: 'pointer',
                '&:hover': {
                  transform: 'scale(1.02)',
                  transition: 'transform 0.2s ease-in-out'
                }
              }}
              onClick={() => navigate(`/game/${game.id}`, { state: { game } })}
            >
              <CardMedia
                component="img"
                height="200"
                image={game.background_image}
                alt={game.name}
                sx={{
                  objectFit: 'cover'
                }}
              />
              <CardContent>
                <Typography 
                  gutterBottom 
                  variant="h6" 
                  component="div"
                  sx={{
                    fontWeight: 'bold',
                    textAlign: 'center',
                    color: 'white'
                  }}
                >
                  {game.name}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default HomePage;