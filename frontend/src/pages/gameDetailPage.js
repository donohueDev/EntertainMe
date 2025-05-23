// gameDetailPage.js is used to display game details to user
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from '../config';
import { useUser } from '../context/userContext';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  CircularProgress,
  Grid,
  Rating,
  Snackbar
} from '@mui/material';
// need to add logic to reset starRating and dropdown item list on navigation to page

// GameDetailPage component for displaying detailed game information
const GameDetailPage = () => {
  const location = useLocation();
  const game = location.state?.game;
  const [rating, setRating] = useState(0);
  const [status, setStatus] = useState('not played');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userGameData, setUserGameData] = useState(null);
  const navigate = useNavigate();
  const { isAuthenticated, getUserInfo } = useUser();

  // Function to get English description
  const getEnglishDescription = (description) => {
    if (!description) return 'No description available.';
    const spanishIndex = description.indexOf('Español');
    return spanishIndex !== -1 ? description.substring(0, spanishIndex).trim() : description;
  };

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Fetch user's current game data when component mounts or when user/game changes
  useEffect(() => {
    const fetchUserGameData = async () => {
      if (isAuthenticated && game?.id) {
        try {
          const userInfo = getUserInfo();
          if (!userInfo?.userId) {
            throw new Error('User information not found');
          }

          const response = await axios.get(`${API_BASE_URL}/api/userGames/${userInfo.userId}/games/${game.id}`);
          if (response.data) {
            setUserGameData(response.data);
            setRating(response.data.user_rating || 0);
            setStatus(response.data.user_status || 'not played');
          }
        } catch (error) {
          console.error('Error fetching user game data:', error);
        }
      }
    };

    fetchUserGameData();
  }, [isAuthenticated, getUserInfo, game?.id]);

  const handleRating = async () => {
    if (!isAuthenticated) {
      navigate('/account');
      return;
    }

    setLoading(true);
    try {
      const userInfo = getUserInfo();
      if (!userInfo?.userId) {
        throw new Error('User information not found');
      }

      const response = await axios.post(`${API_BASE_URL}/api/userGames/ratings`, {
        username: userInfo.username,
        gameId: game.id,
        rating: Math.round(rating),
        status,
      });
      console.log("Post review response: ", response);
      setUserGameData({
        ...userGameData,
        user_rating: Math.round(rating),
        user_status: status
      });

      setSuccess(true);
    } catch (error) {
      console.error('Error submitting rating:', error);
      setError(error.response?.data?.message || 'Failed to submit rating. Please try again.');
    } finally {
      setLoading(false);
    }
  };

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
            <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>
              Game Information
            </Typography>
            <Grid container spacing={2}>
              {game && (
                <>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body1" sx={{ color: 'white' }}>
                      <strong>Release Date:</strong> {game.released || 'N/A'}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body1" sx={{ color: 'white' }}>
                      <strong>ESRB Rating:</strong> {game.esrb_rating || 'N/A'}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body1" sx={{ color: 'white' }}>
                      <strong>Metacritic Score:</strong> {game.metacritic ? `${game.metacritic}/100` : 'N/A'}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body1" sx={{ color: 'white' }}>
                      <strong>Average Rating:</strong> {game.rating ? `${game.rating}/5` : 'N/A'}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body1" sx={{ color: 'white' }}>
                      <strong>Reviews Count:</strong> {game.reviews_count?.toLocaleString() || 'N/A'}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body1" sx={{ color: 'white' }}>
                      <strong>Average Playtime:</strong> {game.playtime ? `${game.playtime} hours` : 'N/A'}
                    </Typography>
                  </Grid>
                </>
              )}
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

              <Box sx={{ my: 4 }}>
                <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>
                  Update your game status:
                </Typography>
                <FormControl fullWidth sx={{ mb: 3 }}>
                  <InputLabel id="game-status-label">Game Status</InputLabel>
                  <Select
                    labelId="game-status-label"
                    id="game-status"
                    name="game-status"
                    value={status}
                    label="Game Status"
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <MenuItem value="playing">Playing</MenuItem>
                    <MenuItem value="planned">Planned</MenuItem>
                    <MenuItem value="completed">Completed</MenuItem>
                    <MenuItem value="dropped">Dropped</MenuItem>
                  </Select>
                </FormControl>

                {status !== 'planned' && (
                  <>
                    <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>
                      Rate this game:
                    </Typography>
                    <Rating
                      value={rating}
                      onChange={(event, newValue) => setRating(newValue)}
                      precision={0.5}
                      size="large"
                      sx={{ mb: 3 }}
                    />
                  </>
                )}

                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={handleRating}
                  disabled={loading}
                  fullWidth
                  sx={{ mb: 3 }}
                >
                  {loading ? <CircularProgress size={24} /> : 'Update Rating'}
                </Button>
              </Box>
            </>
          ) : (
            <Box sx={{ my: 4, p: 3, bgcolor: 'background.default', borderRadius: 1 }}>
              <Typography variant="h6" gutterBottom sx={{ color: 'white', textAlign: 'center' }}>
                Want to track this game?
              </Typography>
              <Typography variant="body1" sx={{ color: 'white', textAlign: 'center', mb: 1 }}>
                Log in or create an account to:
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ color: 'white', textAlign: 'center' }}>
                  • Rate your games
                </Typography>
                <Typography variant="body2" sx={{ color: 'white', textAlign: 'center' }}>
                  • Track your game status
                </Typography>
                <Typography variant="body2" sx={{ color: 'white', textAlign: 'center' }}>
                  • Build your game collection
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigate('/account')}
                  sx={{ flex: 1 }}
                >
                  Log In
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => navigate('/register')}
                  sx={{ flex: 1 }}
                >
                  Create Account
                </Button>
              </Box>
            </Box>
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
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError('')}
      >
        <Alert severity="error" onClose={() => setError('')}>
          {error}
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
