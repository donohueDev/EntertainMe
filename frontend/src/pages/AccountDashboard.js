// accountDashboard.js is used to display reviewed games to user
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../context/userContext';
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
  Grid,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import Rating from '@mui/material/Rating';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const AccountDashboard = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredGames, setFilteredGames] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const navigate = useNavigate();
  const { username } = useParams();
  const { isAuthenticated, getUserInfo, logout } = useUser();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [gameToDelete, setGameToDelete] = useState(null);

  // Fetch user's games when component mounts
  useEffect(() => {
    const fetchUserGames = async () => {
      if (!isAuthenticated) {
        setLoading(false);
        return;
      }

      try {
        const userInfo = getUserInfo();
        if (!userInfo?.userId) {
          throw new Error('User information not found');
        }

        // Verify that the username in URL matches the logged-in user
        if (userInfo.username !== username) {
          throw new Error('Unauthorized access');
        }

        const response = await axios.get(`${API_BASE_URL}/api/userGames/${userInfo.userId}/games`);
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
  }, [isAuthenticated, getUserInfo, username]);

  // Filter games based on status
  const handleStatusFilterChange = (event) => {
    const selectedStatus = event.target.value;
    setStatusFilter(selectedStatus);

    if (selectedStatus === 'all') {
      setFilteredGames(games);
    } else {
      const filtered = games.filter(game => 
        game.user_status?.toLowerCase() === selectedStatus.toLowerCase()
      );
      setFilteredGames(filtered);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleGameClick = (game) => {
    navigate(`/game/${game.slug}`, { state: { game } });
  };

  const handleDeleteClick = (game, event) => {
    event.stopPropagation(); // Prevent card click
    setGameToDelete(game);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const userInfo = getUserInfo();
      await axios.delete(`${API_BASE_URL}/api/userGames/${userInfo.userId}/games/${gameToDelete.id}`);
      setGames(games.filter(g => g.id !== gameToDelete.id));
      setFilteredGames(filteredGames.filter(g => g.id !== gameToDelete.id));
      setDeleteDialogOpen(false);
      setGameToDelete(null);
    } catch (error) {
      console.error('Failed to delete game:', error);
      setError('Failed to remove game from your collection. Please try again later.');
    }
  };

  const handleUpdateClick = (game, event) => {
    event.stopPropagation(); // Prevent card click
    handleGameClick(game);
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

  // If not authenticated, show message and login button
  if (!isAuthenticated) {
    return (
      <Container>
        <Box mt={4} textAlign="center">
          <Typography variant="h5" gutterBottom>
            Please log in to view your account
          </Typography>
          <Button variant="contained" color="primary" onClick={() => navigate('/auth/login')}>
            Login
          </Button>
        </Box>
      </Container>
    );
  }

  const userInfo = getUserInfo();

  // If no games in collection or no games in selected category, show message and button to browse games
  if (games.length === 0 || filteredGames.length === 0) {
    const categoryMessage = statusFilter !== 'all' 
      ? `You haven't added any games to your ${statusFilter.toLowerCase()} collection yet`
      : "You haven't added any games to your collection yet";

    return (
      <Container>
        <Box mt={4}>
          <Typography variant="h4" gutterBottom>
            Welcome, {userInfo?.username}!
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
                <MenuItem value="planned" disabled={statusFilter === 'planned'}>Planned</MenuItem>
                <MenuItem value="playing" disabled={statusFilter === 'playing'}>Currently Playing</MenuItem>
                <MenuItem value="completed" disabled={statusFilter === 'completed'}>Completed</MenuItem>
                <MenuItem value="dropped" disabled={statusFilter === 'dropped'}>Dropped</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box textAlign="center">
            <Typography variant="body1" color="text.secondary" paragraph>
              {categoryMessage}
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
            <Button
              variant="outlined" 
              color="secondary" 
              onClick={handleLogout}
              sx={{ mt: 2, ml: 2 }}
            >
              Logout
            </Button>
          </Box>
        </Box>
      </Container>
    );
  }

  return (
    <Container>
      <Box mt={4}>
        <Typography variant="h4" gutterBottom>
          Welcome, {userInfo?.username}!
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
              <MenuItem value="planned" disabled={statusFilter === 'planned'}>Planned</MenuItem>
              <MenuItem value="playing" disabled={statusFilter === 'playing'}>Currently Playing</MenuItem>
              <MenuItem value="completed" disabled={statusFilter === 'completed'}>Completed</MenuItem>
              <MenuItem value="dropped" disabled={statusFilter === 'dropped'}>Dropped</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Grid container spacing={3}>
          {filteredGames.map((game) => (
            <Grid item xs={12} sm={6} md={4} key={game.id}>
              <Card 
                sx={{ 
                  cursor: 'pointer',
                  transition: 'transform 0.2s',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    '& .action-buttons': {
                      opacity: 1
                    }
                  }
                }}
                onClick={() => handleGameClick(game)}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={game.background_image || 'https://via.placeholder.com/140'}
                  alt={game.name}
                />
                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <Typography gutterBottom variant="h6" component="div">
                    {game.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Status: {game.user_status || 'Not played'}
                  </Typography>
                  {game.user_status?.toLowerCase() !== 'planned' && (
                    <Box display="flex" alignItems="center" mt={1}>
                      <Typography component="legend">Your Rating:</Typography>
                      <Rating 
                        value={game.user_rating || 0} 
                        readOnly 
                        precision={0.5}
                      />
                    </Box>
                  )}
                </CardContent>
                <Box 
                  className="action-buttons"
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    display: 'flex',
                    gap: 1,
                    opacity: 0,
                    transition: 'opacity 0.2s',
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    borderRadius: 1,
                    padding: 0.5,
                    '& .MuiIconButton-root': {
                      color: 'white',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)'
                      }
                    }
                  }}
                >
                  <IconButton 
                    size="small" 
                    onClick={(e) => handleUpdateClick(game, e)}
                    color="primary"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton 
                    size="small" 
                    onClick={(e) => handleDeleteClick(game, e)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Dialog
          open={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
        >
          <DialogTitle>Remove Game</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to remove {gameToDelete?.name} from your collection?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleDeleteConfirm} color="error">Delete</Button>
          </DialogActions>
        </Dialog>

        <Box mt={4} display="flex" justifyContent="center">
          <Button variant="contained" color="secondary" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Box>
    </Container>
  )
};

export default AccountDashboard;