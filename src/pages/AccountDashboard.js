// accountDashboard.js is used to display reviewed games to user
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  Grid
} from '@mui/material';

const AccountDashboard = () => {
  // useState used to declare and manage state variables which change with user interaction
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const navigate = useNavigate();
  const { updateUser } = useUser(); // Destructure updateUser correctly

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
          showLoginPopup();  // Show the login popup if the user is not logged in
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

  // we use focus effect so that the page refetches games ever time we navigate to the page
  // is called when page is loaded or user changes
  useEffect(() => {
    if (user?.id) {
      fetchUserGames(user.id);  // allows page to update list of reviewed games
    }
  }, [user]);

  // this function fetches all games reviewed by the user using backend route 
  const fetchUserGames = async (userId) => {
    try {
      setGames([]); // Clear previous games
      const response = await axios.get(`http://localhost:3001/api/userGames/${userId}/games`);
      
      // If response data exists and is an array, update the games state
      if (Array.isArray(response.data)) {
        setGames(response.data); // If there are no games, response.data will be an empty array
      } else {
        setGames([]); // If the response is not an array, set to an empty array
      }
    } catch (error) {
      console.error('Failed to fetch user games:', error);
      setError('Failed to load user games. Please try again.');
    }
  };

  // function used to logout user - clears localStorage and updates user context
  const logoutUser = async () => {
    try {
      // Clear localStorage
      localStorage.clear();
      localStorage.setItem('loggedIn', 'false');

      // Update user context to reflect logout
      updateUser({ id: null, username: null, isLoggedIn: 'false' });

      // Clear games and other related states
      setGames([]);
      setFilteredGames([]);
      setStatusFilter('all');

      // Navigate to Home screen or Login screen
      navigate('/');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  // effect runs when user changes 
  useEffect(() => {
    console.log("User information after logout:", user);
  }, [user]);

  // use effect to run when status filter is changed or games list changes
  useEffect(() => {
    if (statusFilter === 'all') {
      setFilteredGames(games); // Show all games when filter is "all"
    } else {
      setFilteredGames(games.filter((game) => game.user_status === statusFilter)); // Filter based on user status
    }
  }, [games, statusFilter]);

  // alert used when user tries to review game without being logged in or gets to dashboard without being signed in through a bug
  const showLoginPopup = () => {
    if (window.confirm('You need to log in to access this page.')) {
      navigate('/account');
    } else {
      navigate(-1);
    }
  };

  // loading text to display 
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  // if theres an erorr display error message with option to navigate to account page to try again 
  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
        <Button variant="contained" onClick={() => navigate('/account')}>
          Login?
        </Button>
      </Container>
    );
  }

  // main content for dashboard view
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'white' }}>
        Welcome, {user?.username}!
      </Typography>
      
      <FormControl fullWidth sx={{ mb: 4 }}>
        <InputLabel id="status-filter-label">Filter by status</InputLabel>
        <Select
          labelId="status-filter-label"
          value={statusFilter}
          label="Filter by status"
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <MenuItem value="all">All Games</MenuItem>
          <MenuItem value="played">Played</MenuItem>
          <MenuItem value="playing">Currently Playing</MenuItem>
        </Select>
      </FormControl>
      
      {/* Display a message if no games match the filter or display games using flatlist */}
      {filteredGames.length === 0 ? (
        <Typography variant="h6" sx={{ textAlign: 'center', color: 'white' }}>
          No games found. Please submit a review and come back here to view.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {filteredGames.map((game) => (
            <Grid item xs={12} sm={6} md={4} key={game.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={game.background_image || 'https://eagle-sensors.com/hbc-power-control-solutions/unavailable-image/'}
                  alt={game.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {game.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Status: {game.user_status || 'N/A'}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Rating: {game.user_rating || 'N/A'}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
  
      {/* Logout button to log out the user */}
      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        <Button variant="contained" color="primary" onClick={logoutUser}>
          Logout
        </Button>
      </Box>
    </Container>
  );
};

export default AccountDashboard;
