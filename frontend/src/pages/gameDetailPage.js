// gameDetailPage.js is used to display game details to user
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import API_BASE_URL from '../config';
import { useUser } from '../context/userContext';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Container,
  Alert,
  CircularProgress,
  Grid,
  Snackbar,
  IconButton
} from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ReviewBox from '../components/ReviewBox';
import useFetchDetails from '../hooks/useFetchDetails';
import useUserContentRating from '../hooks/useUserContentRating';
import LoginPromptBox from '../components/LoginPromptBox';

// Utility function to format date strings
const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

// GameDetailPage component for displaying detailed game information
const GameDetailPage = () => {
  const location = useLocation();
  const initialGame = location.state?.game;
  const [success, setSuccess] = useState(false);
  const { isAuthenticated } = useUser();

  // Handle back navigation
  const handleBackClick = (e) => {
    e.stopPropagation();
    console.log('Current scroll position before back:', window.scrollY);
    // Use the actual browser back button behavior instead of navigate(-1)
    window.history.back();
  };

  // Log scroll position when component mounts
  useEffect(() => {
    console.log('GameDetail mounted, scroll position:', window.scrollY);
  }, []);

  // Fetch game details using custom hook
  const {
    data: game,
    loading: gameLoading,
    error: gameError
  } = useFetchDetails(
    initialGame?.slug ? `${API_BASE_URL}/api/games/${initialGame.slug}` : null,
    { initialData: initialGame, dependencies: [initialGame?.slug] }
  );

  // Use the new hook for rating management
  const {
    rating,
    setRating,
    status,
    setStatus,
    loading: ratingLoading,
    error: ratingError,
    setError: setRatingError,
    success: ratingSuccess,
    setSuccess: setRatingSuccess,
    submitRating,
    updateUserContentState
  } = useUserContentRating({
    contentType: 'games',
    contentId: game?.id
  });

  // Update state when user data changes
  useEffect(() => {
    updateUserContentState();
  }, [updateUserContentState]);

  // Function to get English description
  const getEnglishDescription = (description) => {
    if (!description) return 'No description available.';
    const spanishIndex = description.indexOf('Español');
    return spanishIndex !== -1 ? description.substring(0, spanishIndex).trim() : description;
  };

  if (gameLoading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        flex: 1 
      }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!game) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        minHeight: '100vh',
        flex: 1 
      }}>
        <Alert severity="error">Game information not found</Alert>
      </Box>
    );
  }

  return (
    <Container maxWidth="md" sx={{ 
      py: 4,
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh'
    }}>
      <Card sx={{ 
        borderRadius: 2,
        boxShadow: 'none',
        background: 'rgba(20, 24, 36, 0.98)',
        border: 'none',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        '&:hover': {
          transform: 'none',
          boxShadow: 'none'
        }
      }}>
        {/* Title Section */}
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            p: 3,
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
          }}
        >
          <Tooltip title="Go back to previous page" arrow placement="bottom">
            <IconButton
              onClick={handleBackClick}
              sx={{
                color: 'white',
                '&:hover': {
                  color: 'goldenrod',
                  backgroundColor: 'rgba(218, 165, 32, 0.1)'
                }
              }}
            >
              <ArrowBackIcon />
            </IconButton>
          </Tooltip>
          <Typography variant="h4" component="h1" sx={{ color: 'white', fontWeight: 'bold' }}>
            {game.name}
          </Typography>
        </Box>

        <CardMedia
          component="img"
          height="400"
          image={game.background_image}
          alt={game.name}
          sx={{ objectFit: 'cover' }}
        />
        <CardContent>
          {/* Game Details Section */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="subtitle1" sx={{ color: 'text.secondary', mb: 2, fontSize: '1.2rem', fontWeight: 500 }}>
              Game Details
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">
                  <strong>Release Date:</strong> {game.tba ? 'TBA' : (game.released ? formatDate(game.released) : 'N/A')}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Tooltip
                  title={Array.isArray(game.platforms) && game.platforms.length > 0
                    ? (
                        <Box>
                          {game.platforms.map((p, idx) => (
                            <Typography key={idx} variant="body2" sx={{ color: 'white' }}>
                              {p.platform?.name || p.platform?.slug || ''}
                            </Typography>
                          ))}
                        </Box>
                      )
                    : 'N/A'}
                  placement="top"
                  arrow
                  enterTouchDelay={0}
                  leaveTouchDelay={3000}
                >
                  <Typography variant="body1" sx={{ color: 'white', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', cursor: 'pointer' }}>
                    <strong>Platforms:</strong> {Array.isArray(game.platforms) && game.platforms.length > 0
                      ? game.platforms.map(p => p.platform?.name || p.platform?.slug || '').filter(Boolean).join(', ')
                      : 'N/A'}
                  </Typography>
                </Tooltip>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1" sx={{ color: 'white' }}>
                  <strong>ESRB Rating:</strong> {game.esrb_rating?.name || 'Rating Pending'}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1" sx={{ color: 'white' }}>
                  <strong>Average Rating:</strong> {game.rawg_rating ? `${game.rawg_rating}/5` : 'N/A'}
                </Typography>
              </Grid>
              {/* <Grid item xs={12} sm={6}>
                <Typography variant="body1" sx={{ color: 'white' }}>
                  <strong>Reviews Count:</strong> {typeof game.reviews_count === 'number' ? game.reviews_count.toLocaleString() : 'N/A'}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1" sx={{ color: 'white' }}>
                  <strong>Average Playtime:</strong> {game.playtime ? `${game.playtime} hours` : 'N/A'}
                </Typography>
              </Grid> */}
            </Grid>
          </Box>

          {/* User Rating Section */}
          {isAuthenticated ? (
            <ReviewBox
              contentType="game"
              status={status}
              setStatus={setStatus}
              rating={rating}
              setRating={setRating}
              loading={ratingLoading}
              onSubmit={submitRating}
              error={ratingError}
              setError={setRatingError}
              success={ratingSuccess}
              setSuccess={setRatingSuccess}
            />
          ) : (
            <LoginPromptBox
              contentType="game"
            />
          )}

          {/* Game Description */}
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>
              Description
            </Typography>
            <Typography variant="body1" sx={{ color: 'white', whiteSpace: 'pre-wrap' }}>
              {getEnglishDescription(game.description_raw || game.description)}
            </Typography>
          </Box>
        </CardContent>
      </Card>

      <Snackbar
        open={!!gameError}
        autoHideDuration={6000}
        onClose={() => {}}
      >
        <Alert severity="error">
          {gameError}
        </Alert>
      </Snackbar>

      <Snackbar
        open={success}
        autoHideDuration={6000}
        onClose={() => setSuccess(false)}
      >
        <Alert severity="success" onClose={() => setSuccess(false)}>
          Rating updated successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default GameDetailPage;
