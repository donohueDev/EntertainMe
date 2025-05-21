// gameDetailPage.js is used to display game details to user
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../context/userContext'; // Only import useUser
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
  const navigate = useNavigate();
  const { user } = useUser();

  useEffect(() => {
    console.log('User context updated:', user);
  }, [user]);

  const handleRating = async () => {
    console.log('Rating:', rating, 'Status:', status);

    if (status === 'not played' || status === 'planned') {
      setError('Status must be set to played or playing before submitting your rating.');
      return;
    }

    if (user?.isLoggedIn === 'false') {
      if (window.confirm('You need to log in before submitting a rating. Would you like to log in now?')) {
        navigate('/account');
      } else {
        navigate(-1);
      }
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3001/api/userGames/ratings', {
        username: user.username,
        gameId: game.id,
        rating: Math.round(rating),
        status,
      });

      setSuccess(true);
      console.log('Rating submitted successfully:', response.data);
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

          <Box sx={{ my: 4 }}>
            <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>
              Set your game status:
            </Typography>
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel id="game-status-label">Game Status</InputLabel>
              <Select
                labelId="game-status-label"
                value={status}
                label="Game Status"
                onChange={(e) => setStatus(e.target.value)}
              >
                <MenuItem value="playing">Playing</MenuItem>
                <MenuItem value="planned">Planned</MenuItem>
                <MenuItem value="played">Played</MenuItem>
                <MenuItem value="not played">Not Played</MenuItem>
              </Select>
            </FormControl>

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

            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleRating}
              disabled={loading}
              fullWidth
              sx={{ mb: 3 }}
            >
              {loading ? <CircularProgress size={24} /> : 'Submit Rating'}
            </Button>

            <Typography variant="body1" sx={{ color: 'white', whiteSpace: 'pre-wrap' }}>
              {game.description}
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
          Rating submitted successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default GameDetailPage;
