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
  Paper,
} from '@mui/material';

import { Title } from '../components/Title';
import { useUser } from '../context/userContext';
import HorizontalScroller from '../components/HorizontalScroller';
import Footer from '../components/Footer';
import { commonStyles } from '../theme';

// Environment check
const NODE_ENV = process.env.NODE_ENV ?? 'development';
const isDev = NODE_ENV === 'development';

const HomePage = () => {
  const [games, setGames] = useState([]);
  const [anime, setAnime] = useState([]);
  // const [movies, setMovies] = useState([]);
  // const [tvShows, setTvShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { isAuthenticated, userInfo } = useUser();

  useEffect(() => {
    const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

    const getCachedData = (key) => {
      const cachedData = localStorage.getItem(key);
      if (!cachedData) return null;

      const { data, timestamp } = JSON.parse(cachedData);
      const isExpired = Date.now() - timestamp > CACHE_DURATION;

      if (isExpired) {
        localStorage.removeItem(key);
        return null;
      }
      return data;
    };

    const setCachedData = (key, data) => {
      const cacheObject = {
        data,
        timestamp: Date.now(),
      };
      localStorage.setItem(key, JSON.stringify(cacheObject));
    };

    const fetchGames = async () => {
      const cachedGames = getCachedData('topGames');
      
      if (cachedGames) {
        setGames(cachedGames);
        setLoading(false);
        return;
      }

      isDev && console.log('[Games] Fetching top games...');
      try {
        const response = await axios.get(`${API_BASE_URL}/api/games/top`, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });
        isDev && console.log('[Games] Received:', { count: response.data?.length });
        if (response.data && Array.isArray(response.data)) {
          setGames(response.data);
          setCachedData('topGames', response.data);
        } else {
          console.warn('[Games] No games found in response');
          setError('No games found. Please try again later.');
        }
      } catch (error) {
        console.error('[Games] Failed to fetch:', {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
          timestamp: new Date().toISOString()
        });
        setError('Failed to load games. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    const fetchAnime = async () => {
      const cachedAnime = getCachedData('topAnime');
      
      if (cachedAnime) {
        setAnime(cachedAnime);
        setLoading(false);
        return;
      }

      isDev && console.log('[Anime] Fetching top anime...');
      try {
        const response = await axios.get(`${API_BASE_URL}/api/anime/top`, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });
        isDev && console.log('[Anime] Received:', { count: response.data?.length });
        if (response.data && Array.isArray(response.data)) {
          setAnime(response.data);
          setCachedData('topAnime', response.data);
        }
      } catch (error) {
        console.error('[Anime] Failed to fetch:', {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
          timestamp: new Date().toISOString()
        });
        setError('Failed to load anime. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
    fetchAnime();
  }, []);

  // Modify handleLoadGames and handleLoadAnime to clear cache when manually updating
  const handleLoadGames = async () => {
    isDev && console.log('[Games] Initiating manual update...');
    localStorage.removeItem('topGames');
    try {
      const response = await axios.post(`${API_BASE_URL}/api/games/update-top-games`, {}, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      isDev && console.log('[Games] Manual update completed:', { status: response.status });
      window.location.reload();
    } catch (error) {
      console.error('[Games] Manual update failed:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
        timestamp: new Date().toISOString()
      });
      setError('Failed to update top games. Please try again later.');
    }
  };

  const handleLoadAnime = async () => {
    isDev && console.log('[Anime] Initiating manual update...');
    localStorage.removeItem('topAnime');
    try {
      const response = await axios.post(`${API_BASE_URL}/api/anime/update-top-anime`, {}, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      isDev && console.log('[Anime] Manual update completed:', { status: response.status });
      window.location.reload();
    } catch (error) {
      console.error('[Anime] Manual update failed:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
        timestamp: new Date().toISOString()
      });
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

  const GameCard = React.memo(({ gameEntry, onClick }) => (
    <Card
      sx={{
        width: 150,
        height: 240,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        cursor: 'pointer',
        boxSizing: 'border-box',
        ...commonStyles.cardHover,
        bgcolor: 'background.paper',
        ...commonStyles.goldenBorder,
      }}
      onClick={onClick}
    >
      <CardMedia
        component="img"
        height="180"
        image={gameEntry.game.background_image || '/placeholder-image.jpg'}
        alt={gameEntry.game.name}
        sx={{
          width: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          borderTopLeftRadius: 4,
          borderTopRightRadius: 4,
          bgcolor: 'background.paper',
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
            color: 'text.primary',
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
  ));

  const AnimeCard = React.memo(({ animeEntry, onClick }) => (
    <Card
      sx={{
        width: 150,
        height: 240,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        cursor: 'pointer',
        boxSizing: 'border-box',
        ...commonStyles.cardHover,
        bgcolor: 'background.paper',
        ...commonStyles.goldenBorder,
      }}
      onClick={onClick}
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
          bgcolor: 'background.paper',
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
            color: 'text.primary',
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
  ));

  const renderGameCard = (gameEntry) => (
    <GameCard
      key={`${gameEntry.rank}-${gameEntry.game.id}`}
      gameEntry={gameEntry}
      onClick={() => {
        saveScrollPosition();
        if (gameEntry && gameEntry.game && gameEntry.game.slug) {
          navigate(`/game/${gameEntry.game.slug}`, {
            state: { game: gameEntry.game }
          });
        }
      }}
    />
  );

  const renderAnimeCard = (animeEntry) => (
    <AnimeCard
      key={`${animeEntry.rank}-${animeEntry.anime.id}`}
      animeEntry={animeEntry}
      onClick={() => {
        saveScrollPosition();
        if (animeEntry && animeEntry.anime && animeEntry.anime.slug) {
          navigate(`/anime/${animeEntry.anime.slug}`, {
            state: { anime: animeEntry.anime }
          });
        }
      }}
    />
  );

  // Home page layout
  return (
    <Box sx={{ 
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      bgcolor: 'background.default',
    }}>
    <Container 
      maxWidth="xl" 
      sx={{ 
        pt: 1,
        pb: 4,
        flex: 1,
        color: 'text.primary',
        display: 'flex',
        flexDirection: 'column',
        mb: 0,
    }}>

      <Title />

      {/* Construction Warning Banner */}
      <Paper
        sx={{
          p: 2,
          mt: 5,
          mb: 3,
          bgcolor: 'background.paper',
          ...commonStyles.goldenBorder,
          borderRadius: 2,
          boxShadow: '0 0 15px rgba(218, 165, 32, 0.2)',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '2px',
            background: 'linear-gradient(90deg, transparent, goldenrod, transparent)'
          }
        }}
      >
        <Typography variant="body1" align="center" sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          gap: 1,
          fontFamily: "'Montserrat', sans-serif",
          background: 'linear-gradient(to bottom, #FFFFFF 0%, goldenrod 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: '0 0 15px rgba(218, 165, 32, 0.3)',
          fontWeight: 'bold'
        }}>
          🎮 Levels Loading... More features unlocking soon! 🎬
        </Typography>
      </Paper>

      {/* Introduction Section */}
      <Box 
        sx={{ 
          mb: 6,
          p: 4,
          borderRadius: 2,
          bgcolor: 'background.paper',
          boxShadow: '0 0 15px rgba(218, 165, 32, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: 2,
          ...commonStyles.goldenBorder,
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '2px',
            background: 'linear-gradient(90deg, transparent, goldenrod, transparent)'
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '2px',
            background: 'linear-gradient(90deg, transparent, goldenrod, transparent)'
          }
        }}
      >
        <Typography 
          variant="h3" 
          sx={{ 
            fontWeight: 'bold',
            fontFamily: "'Montserrat', sans-serif",
            ...commonStyles.gradientText,
            mb: 2,
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
          }}
        >
          Welcome{isAuthenticated ? `, ${userInfo?.display_name || userInfo?.username}!` : '!'}
        </Typography>
        
        <Typography 
          variant="h6" 
          sx={{ 
            color: 'text.primary',
            maxWidth: '800px',
            mb: 3,
            textAlign: 'center',
            lineHeight: 1.6,
            letterSpacing: '0.02em',
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
          }}
        >
          Track your favorite games and anime, share your thoughts, and connect with fellow fans. 
          <br />
          <strong>More features—like movies, TV shows, and deeper community tools—are on the way! </strong> 
           Stay tuned as we continue to grow and unlock new levels together.
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
              ...commonStyles.goldenBorder,
              ...commonStyles.goldenHover
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
        sx={{ 
          mb: 4,
          '& .MuiTypography-h4': {
            color: 'text.primary',
            fontSize: '3.5rem',
            fontWeight: 'bold',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            textAlign: 'left',
            textShadow: 
              `-1px -1px 0 goldenrod,  
               1px -1px 0 goldenrod,
               -1px 1px 0 goldenrod,
               1px 1px 0 goldenrod,
               0 0 15px rgba(218, 165, 32, 0.5)`,
            mb: 3
          }
        }}
      />

      {/* Top 50 Anime Section */}
      <HorizontalScroller
        items={anime}
        renderCard={renderAnimeCard}
        title="Top 100 Anime"
        sx={{ 
          mb: 4,
          '& .MuiTypography-h4': {
            color: 'text.primary',
            fontSize: '3.5rem',
            fontWeight: 'bold',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            textAlign: 'left',
            textShadow: 
              `-1px -1px 0 goldenrod,  
               1px -1px 0 goldenrod,
               -1px 1px 0 goldenrod,
               1px 1px 0 goldenrod,
               0 0 15px rgba(218, 165, 32, 0.5)`,
            mb: 3
          }
        }}
      />
    </Container>
    <Footer />
    </Box>
  );  
};

export default HomePage;