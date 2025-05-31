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
  Rating,
  Snackbar
} from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
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
    userContentData: userGameData,
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

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Function to get English description
  const getEnglishDescription = (description) => {
    if (!description) return 'No description available.';
    const spanishIndex = description.indexOf('Español');
    return spanishIndex !== -1 ? description.substring(0, spanishIndex).trim() : description;
  };

  if (gameLoading) {
    return (
      <Container>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 300 }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (!game) {
    return (
      <Container>
        <Alert severity="error">Game information not found</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Card sx={{ bgcolor: 'background.paper' }}>
        <CardMedia
          component="img"
          height="400"
          image={game.background_image}
          alt={game.name}
          sx={{ objectFit: 'cover' }}
        />
        <CardContent>
          <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'white' }}>
            {game.name}
          </Typography>

          {/* Game Details Section */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="subtitle1" sx={{ color: '#bdbdbd', mb: 2, fontSize: '1.2rem', fontWeight: 500 }}>
              Game Details
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1" sx={{ color: 'white' }}>
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

          {/* User Rating Section - Only shown for logged-in users */}
          {isAuthenticated ? (
            <>
              {userGameData && (
                <Box sx={{ mb: 4, p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
                  <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>
                    Current Status:
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'white', mb: 1 }}>
                    Status: {userGameData.user_status || 'Not set'}
                  </Typography>
                  {userGameData.user_status !== 'planned' && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="body1" sx={{ color: 'white' }}>
                        Rating:
                      </Typography>
                      <Rating
                        value={userGameData.user_rating || 0}
                        readOnly
                        precision={0.5}
                        size="small"
                      />
                    </Box>
                  )}
                </Box>
              )}

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
            </>
          ) : (
            <LoginPromptBox
              contentType="game"
              actions={["rate", "track", "build your collection"]}
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
