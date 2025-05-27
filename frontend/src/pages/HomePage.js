// Import necessary libraries and modules
import React, { useEffect, useState, useRef } from 'react';
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
  IconButton
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useUser } from '../context/userContext';

const HomePage = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const scrollContainerRef = useRef(null);
  const { isAuthenticated } = useUser();

  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = 200; 
      const cardGap = 24; 
      const containerWidth = container.clientWidth;
      const cardsPerView = Math.floor((containerWidth + cardGap) / (cardWidth + cardGap));
      const scrollAmount = (cardWidth + cardGap) * cardsPerView;
      
      const newScrollPosition = container.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
      container.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const fetchGames = async () => {
      console.log('Fetching top games...');
      try {
        // Fetch the top 50 games from the server
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
  // loading symbol
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  // if error getting games print to screen, let user load games into DB
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

  // Home page layout
  return (
    <Container maxWidth="lg" sx={{ 
      py: 4,
      backgroundColor: '#0A1929', // Dark blue background
      minHeight: '100vh',
      color: '#E0E0E0' // Light gray text
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
          Your personal gaming companion. Track your favorite games, rate your experiences, 
          and discover new titles to play. Join our community of gamers today!
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
  
      <Typography 
          variant="h4" 
          sx={{ 
            fontWeight: 'bold', 
            fontFamily: 'Varela Round',
            textAlign: 'left', 
            flexGrow: 1, 
            color: '#E0E0E0', // Light gray
            mb: 3
          }}
        >
          Top 50 Games
        </Typography>

      {/* Games container with navigation arrows */}
      <Box sx={{ position: 'relative', width: '100%', display: 'flex', alignItems: 'center', gap: 2 }}>
        {/* Left arrow */}
        <IconButton
          onClick={() => handleScroll('left')}
          sx={{
            backgroundColor: '#042454',
            '&:hover': {
              backgroundColor: '#374265',
            },
            color: 'white',
            width: 40,
            height: 40,
            flexShrink: 0,
          }}
        >
          <ArrowBackIosNewIcon />
        </IconButton>

        {/* Scroll container */}
        <Box
          ref={scrollContainerRef}
          sx={{
            display: 'grid',
            gridAutoFlow: 'column',
            gridTemplateRows: 'repeat(2, 1fr)',
            overflowX: 'auto',
            overflowY: 'hidden',
            gap: 3,
            py: 1,
            px: 2,
            '&::-webkit-scrollbar': { 
              display: 'none'  // Hide scrollbar for Chrome, Safari and Opera
            },
            scrollbarWidth: 'none',  // Hide scrollbar for Firefox
            msOverflowStyle: 'none',  // Hide scrollbar for IE and Edge
            height: 400,
            scrollBehavior: 'smooth',
            flexGrow: 1,
          }}
        >
          {games.map((game) => (
            <Card
              key={game.id}
              sx={{
                width: 200,
                height: 180,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                cursor: 'pointer',
                boxSizing: 'border-box',
                '&:hover': {
                  transform: 'scale(1.03)',
                  transition: 'transform 0.2s',
                  boxShadow: '0 0 15px rgba(224, 224, 224, 0.2)', // Light gray glow
                },
                backgroundColor: '#1A1A1A', // Darker gray for cards
                border: '1px solid #424242', // Medium gray border
              }}
              onClick={() => navigate(`/game/${game.id}`, { state: { game } })}
            >
              <CardMedia
                component="img"
                height="130"
                image={game.background_image}
                alt={game.name}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent
                sx={{
                  height: 30,
                  display: 'flex',
                  alignItems: 'center',       // Vertically center the content
                  justifyContent: 'center',   // Horizontally center the text
                  textAlign: 'center',        // Center text inside the Typography
                }}
              >
                <Typography
                  variant="h8"
                  component="div"
                  sx={{
                    fontWeight: 'bold',
                    fontFamily: 'sans-serif',
                    color: '#E0E0E0', // Light gray text
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,       // Allows wrapping to 2 lines
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  {game.name}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* Right arrow */}
        <IconButton
          onClick={() => handleScroll('right')}
          sx={{
            backgroundColor: '#042454',
            '&:hover': {
              backgroundColor: '#374265',
            },
            color: 'white',
            width: 40,
            height: 40,
            flexShrink: 0,
          }}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>
    </Container>
  );  
};

export default HomePage;