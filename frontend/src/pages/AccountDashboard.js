// accountDashboard.js is used to display reviewed games to user
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../context/userContext'; // Only import useUser
import API_BASE_URL from '../config';
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
  Grid
} from '@mui/material';
import Rating from '@mui/material/Rating';

const AccountDashboard = () => {
  // useState used to declare and manage state variables which change with user interaction
  const [user, setUser] = useState(null);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredGames, setFilteredGames] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const navigate = useNavigate();
  const { user: contextUser, updateUser } = useUser();

  // Fetch user's games when component mounts
  useEffect(() => {
    const fetchUserGames = async () => {
      if (!contextUser?.userId) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${API_BASE_URL}/api/userGames/${contextUser.userId}/games`);
        setGames(response.data);
        setFilteredGames(response.data);
      } catch (error) {
        console.error('Failed to fetch user games:', error);
        setError('Failed to load your games. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserGames();
  }, [contextUser]);

  // we use useEffect to perform side effects like data fetching/logging
  useEffect(() => {
    // getUserData runs once when component is mounted with an empty dependency array
    const getUserDataFromStorage = async () => {
      try {
        // Using localStorage instead of AsyncStorage
        const storedUserId = localStorage.getItem('userId');
        const storedUsername = localStorage.getItem('username');
        const storeLogin = localStorage.getItem('loggedIn');

        // if the login variable is set to true then we update the user context
        if (storeLogin === 'true' && storedUserId) {
          setUser({ id: storedUserId, username: storedUsername });
        } else {
          // if not logged in we set user context to null and show popup
          setUser(null);
          setGames([]);
        }
      } catch (err) {
        console.error('Failed to load user data:', err);
        setError('Failed to load user data.');
      } finally {
        // once processed set loading state to false
        setLoading(false);
      }
    };

    getUserDataFromStorage();
  }, []);

  // function used to logout user - clears localStorage and updates user context
  const logoutUser = async () => {
    try {
      // Clear localStorage
      localStorage.removeItem('userId');
      localStorage.removeItem('username');
      localStorage.removeItem('loggedIn');

      // Update user context to reflect logout
      updateUser({
        userId: '',
        username: '',
        isLoggedIn: 'false'
      });

      // Clear games and other related states
      setGames([]);
      setFilteredGames([]);
      setUser(null);
      navigate('/');
    } catch (error) {
      console.error('Error during logout:', error);
      setError('Failed to logout. Please try again.');
    }
  };

  // Filter games based on status
  const handleStatusFilterChange = (event) => {
    const selectedStatus = event.target.value;
    setStatusFilter(selectedStatus);

    if (selectedStatus === 'all') {
      setFilteredGames(games);
    } else {
      const filtered = games.filter(game => game.user_status === selectedStatus);
      setFilteredGames(filtered);
    }
  };

  // If loading, show loading spinner
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  // If error, show error message
  if (error) {
    return (
      <Container>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  // If not logged in, show message and login button
  if (!user) {
    return (
      <Container>
        <Box mt={4} textAlign="center">
          <Typography variant="h5" gutterBottom>
            Please log in to view your account
          </Typography>
          <Button variant="contained" color="primary" onClick={() => navigate('/login')}>
            Login
          </Button>
        </Box>
      </Container>
    );
  }

  // If no games in collection, show message and button to browse games
  if (games.length === 0) {
    return (
      <Container>
        <Box mt={4} textAlign="center">
          <Typography variant="h5" gutterBottom>
            You haven't added any games to your collection yet
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Browse our collection of games and start rating your favorites!
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => navigate('/')}
            sx={{ mt: 2 }}
          >
            Browse Games
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container>
      <Box mt={4}>
        <Typography variant="h4" gutterBottom>
          Welcome, {user.username}!
        </Typography>
        
        <Box mb={3}>
          <FormControl fullWidth>
            <InputLabel>Filter by Status</InputLabel>
            <Select
              value={statusFilter}
              onChange={handleStatusFilterChange}
              label="Filter by Status"
            >
              <MenuItem value="all">All Games</MenuItem>
              <MenuItem value="not played">Not Played</MenuItem>
              <MenuItem value="playing">Currently Playing</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
              <MenuItem value="dropped">Dropped</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Grid container spacing={3}>
          {filteredGames.map((game) => (
            <Grid item xs={12} sm={6} md={4} key={game.id}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={game.background_image || 'https://via.placeholder.com/140'}
                  alt={game.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {game.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Status: {game.user_status || 'Not played'}
                  </Typography>
                  <Box display="flex" alignItems="center" mt={1}>
                    <Typography component="legend">Your Rating:</Typography>
                    <Rating value={game.user_rating || 0} readOnly />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box mt={4} display="flex" justifyContent="center">
          <Button variant="contained" color="secondary" onClick={logoutUser}>
            Logout
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default AccountDashboard;