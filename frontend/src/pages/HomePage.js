// Import necessary libraries and modules
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from '../config';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Container,
  Box,
  CircularProgress,
  Alert,
  Button,
} from '@mui/material';

import { useUser } from '../context/userContext';
import HorizontalScroller from '../components/HorizontalScroller';

const HomePage = () => {
  const [games, setGames] = useState([]);
  const [anime, setAnime] = useState([]);
  // const [movies, setMovies] = useState([]);
  // const [tvShows, setTvShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { isAuthenticated } = useUser();


  useEffect(() => {
    const fetchGames = async () => {
      console.log('Fetching top games...');
      try {
        const response = await axios.get(`${API_BASE_URL}/api/games/top`, {
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
        setError('Failed to load games. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    // fetch top anime from api
    const fetchAnime = async () => {
      console.log('Fetching top anime...');
      try {
        const response = await axios.get(`${API_BASE_URL}/api/anime/top`, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });
        console.log('Anime response:', response.data);
        if (response.data && Array.isArray(response.data)) {
          setAnime(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch anime:", error.message);
        setError('Failed to load anime. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchGames();
    fetchAnime();
  }, []);

  const handleLoadGames = async () => {
    console.log('Updating top games...');
    try {
      const response = await axios.post(`${API_BASE_URL}/api/games/update-top-games`, {}, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      console.log('Update top games response:', response.data);
      window.location.reload();
    } catch (error) {
      console.error('Failed to update top games:', error.message);
      if (error.response) {
        console.error("Error response:", error.response.data);
        console.error("Error status:", error.response.status);
      }
      setError('Failed to update top games. Please try again later.');
    }
  };

  const handleLoadAnime = async () => {
    console.log('Updating top anime...');
    try {
      const response = await axios.post(`${API_BASE_URL}/api/anime/update-top-anime`, {}, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      console.log('Update top anime response:', response.data);
      window.location.reload();
    } catch (error) {
      console.error('Failed to update top anime:', error.message);
      if (error.response) {
        console.error("Error response:", error.response.data);
        console.error("Error status:", error.response.status);
      }
      setError('Failed to update top anime. Please try again later.');
    }
  };

  // loading symbol
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  // if error getting games or anime print to screen, let user load games/anime into DB
  if (error) {
    const handleReloadAll = async () => {
      setLoading(true);
      setError(null);
      const updatePromises = [];
      if (games.length === 0) {
        updatePromises.push(handleLoadGames());
      }
      if (anime.length === 0) {
        updatePromises.push(handleLoadAnime());
      }
      try {
        if (updatePromises.length > 0) {
          await Promise.all(updatePromises);
        }
        window.location.reload();
      } catch (err) {
        console.error('Failed to update games and/or anime:', err.message);
        setError('Failed to update games and/or anime. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
        <Button 
          variant="contained" 
          color="primary"
          onClick={handleReloadAll}
          sx={{ mt: 2 }}
        >
          Try Loading Content Again
        </Button>
      </Container>
    );
  }

  // Save scroll position before navigating away from HomePage
  const saveScrollPosition = () => {
    sessionStorage.setItem('homeScrollY', window.scrollY.toString());
  };

  // Move renderCard functions here so they're always in scope
  const renderGameCard = (gameEntry, idx) => (
    <Card
      key={`${gameEntry.rank}-${gameEntry.game.id}`}
      sx={{
        width: 150,
        height: 240,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        cursor: 'pointer',
        boxSizing: 'border-box',
        '&:hover': {
          transform: 'scale(1.03)',
          transition: 'transform 0.2s',
          boxShadow: '0 0 15px rgba(224, 224, 224, 0.2)',
        },
        backgroundColor: '#1A1A1A',
        border: '1px solid #424242',
      }}
      onClick={() => {
        saveScrollPosition();
        if (gameEntry && gameEntry.game && gameEntry.game.slug) {
          navigate(`/game/${gameEntry.game.slug}`, {
            state: { game: gameEntry.game }
          });
        }
      }}
    >
      <CardMedia
        component="img"
        height="180"
        image={gameEntry.game.background_image || '/placeholder-image.jpg'}
        alt={gameEntry.game.name}
        sx={{
          width: '100%',
          objectFit: 'cover', // Fill the box, cropping as needed
          objectPosition: 'center',
          borderTopLeftRadius: 4,
          borderTopRightRadius: 4,
          backgroundColor: '#222',
        }}
      />
      <CardContent
        sx={{
          height: 50,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        <Typography
          variant="h8"
          component="div"
          sx={{
            fontWeight: 'bold',
            fontFamily: 'sans-serif',
            color: '#E0E0E0',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {gameEntry.game.name}
        </Typography>
      </CardContent>
    </Card>
  );

  const renderAnimeCard = (animeEntry, idx) => (
    <Card
      key={`${animeEntry.rank}-${animeEntry.anime.id}`}
      sx={{
        width: 150,
        height: 240,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        cursor: 'pointer',
        boxSizing: 'border-box',
        '&:hover': {
          transform: 'scale(1.03)',
          transition: 'transform 0.2s',
          boxShadow: '0 0 15px rgba(224, 224, 224, 0.2)',
        },
        backgroundColor: '#1A1A1A',
        border: '1px solid #424242',
      }}
      onClick={() => {
        saveScrollPosition();
        if (animeEntry && animeEntry.anime && animeEntry.anime.slug) {
          navigate(`/anime/${animeEntry.anime.slug}`, {
            state: { anime: animeEntry.anime }
          });
        }
      }}
    >
      <CardMedia
        component="img"
        height="180"
        image={
          animeEntry.anime.images?.jpg?.large_image_url ||
          animeEntry.anime.images?.webp?.large_image_url ||
          '/placeholder-image.jpg'
        }
        alt={animeEntry.anime.title_english || animeEntry.anime.title}
        sx={{
          width: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          borderTopLeftRadius: 4,
          borderTopRightRadius: 4,
        }}
      />
      <CardContent
        sx={{
          height: 50,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        <Typography
          variant="h8"
          component="div"
          sx={{
            fontWeight: 'bold',
            fontFamily: 'sans-serif',
            color: '#E0E0E0',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {animeEntry.anime.title_english || animeEntry.anime.title}
        </Typography>
      </CardContent>
    </Card>
  );

  // Home page layout
  return (
    <Container maxWidth="xl" sx={{ 
      py: 4,
      backgroundColor: '#0A1929',
      minHeight: '100vh',
      color: '#E0E0E0',
      display: 'block', // revert to block to allow content to flow naturally
      // Remove alignItems, justifyContent, and gap for block layout
    }}>
      {/* Header with logo and title */}
      <Box 
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          mb: 4 
        }}
      >
        {/* Logo placeholder */}
        <Box 
          component="img" 
          src="/logo-placeholder-image.png"
          alt="Logo"
          sx={{ width: 60, height: 60 }}
        />
  
        {/* Title */}
        <Typography 
          variant="h4" 
          sx={{ 
            fontWeight: 'bold', 
            textAlign: 'center', 
            flexGrow: 1, 
            color: '#E0E0E0' // Light gray
          }}
        >
          EntertainME
        </Typography>
      </Box>

      {/* Introduction Section */}
      <Box 
        sx={{ 
          mb: 6,
          p: 4,
          borderRadius: 2,
          background: 'linear-gradient(45deg, #042454 30%, #374265 90%)',
          boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: 2
        }}
      >
        <Typography 
          variant="h3" 
          sx={{ 
            fontWeight: 'bold',
            fontFamily: 'Varela Round',
            color: '#ffffff',
            mb: 2
          }}
        >
          Welcome to EntertainME
        </Typography>
        
        <Typography 
          variant="h6" 
          sx={{ 
            color: '#E0E0E0',
            maxWidth: '800px',
            mb: 3
          }}
        >
          Your personal entertainment companion. Track your favorite games, anime, movies, and shows, rate your experiences, and discover new titles to enjoy. Join our community of fans today!
        </Typography>

        {!isAuthenticated && (
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/auth/register')}
            sx={{
              py: 1.5,
              px: 4,
              fontSize: '1.1rem',
              backgroundColor: '#4CAF50',
              '&:hover': {
                backgroundColor: '#45a049',
              },
              boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .2)',
            }}
          >
            Join Now
          </Button>
        )}
      </Box>

      {/* Games container with navigation arrows */}
      <HorizontalScroller
        items={games}
        renderCard={renderGameCard}
        title="Top 100 Games"
        sx={{ mb: 6 }} // Add margin bottom for spacing below game cards
      />

      {/* Top 50 Anime Section */}
      {/* Anime container with navigation arrows */}
      <HorizontalScroller
        items={anime}
        renderCard={renderAnimeCard}
        title="Top 100 Anime"
      />
    </Container>
  );  
};

export default HomePage;