// accountDashboard.js is used to display reviewed games and anime to user
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/userContext';
import useFetchUserContentData from '../hooks/useFetchUserContentData';
import API_BASE_URL from '../config';
import axios from 'axios';
import {
  Box,
  Typography,
  Button,
  ButtonGroup,
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
  const [anime, setAnime] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const [filteredGames, setFilteredGames] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const navigate = useNavigate();
  const { isAuthenticated, getUserInfo, logout } = useUser();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [gameToDelete, setGameToDelete] = useState(null);
  const [animeToDelete, setAnimeToDelete] = useState(null);

  // Content type dropdown state
  const [contentType, setContentType] = useState('games');

  // Use the reusable hook to fetch user's games
  const {
    userContentData: userGames,
    loading: gamesLoading,
    error: gamesError
  } = useFetchUserContentData({
    isAuthenticated,
    getUserInfo,
    contentId: null, // null means fetch all for this type
    contentType: 'games'
  });

  // Use the reusable hook to fetch user's anime
  const {
    userContentData: userAnime,
    loading: animeLoading,
    error: animeError
  } = useFetchUserContentData({
    isAuthenticated,
    getUserInfo,
    contentId: null, // null means fetch all for this type
    contentType: 'anime'
  });

  const [filteredAnime, setFilteredAnime] = useState([]);
  const [animeStatusFilter, setAnimeStatusFilter] = useState('all');

  useEffect(() => {
    if (userGames && Array.isArray(userGames)) {
      setGames(userGames);
      setFilteredGames(userGames);
    }
    setLoading(gamesLoading);
    setError(gamesError);
  }, [userGames, gamesLoading, gamesError]);

  useEffect(() => {
    if (userAnime && Array.isArray(userAnime)) {
      setAnime(userAnime);
      setFilteredAnime(userAnime);
    }
    setLoading(animeLoading);
    setError(animeError);
  }, [userAnime, animeLoading, animeError]);

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

  const handleAnimeStatusFilterChange = (event) => {
    const selectedStatus = event.target.value;
    setAnimeStatusFilter(selectedStatus);
    if (selectedStatus === 'all') {
      setFilteredAnime(anime);
    } else {
      const filtered = anime.filter(anime => 
        anime.user_status?.toLowerCase() === selectedStatus.toLowerCase()
      );
      setFilteredAnime(filtered);
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

  const handleAnimeDelete = (anime, event) => {
    event.stopPropagation(); // Prevent card click
    setAnimeToDelete(anime);
    setDeleteDialogOpen(true);
  };

  const handleAnimeDeleteConfirm = async () => {
    try {
      const userInfo = getUserInfo();
      await axios.delete(`${API_BASE_URL}/api/userAnimes/${userInfo.userId}/anime/${animeToDelete.id}`);
      setAnime(anime.filter(a => a.id !== animeToDelete.id));
      setFilteredAnime(filteredAnime.filter(a => a.id !== animeToDelete.id));
      setDeleteDialogOpen(false);
      setAnimeToDelete(null);
    } catch (error) {
      console.error('Failed to delete anime:', error);
      setError('Failed to remove anime from your collection. Please try again later.');
    }
  };

  const handleAnimeUpdate = (anime, event) => {
    event.stopPropagation(); // Prevent card click
    navigate(`/anime/${anime.slug}`, { state: { anime } });
  };

  // If loading, show loading spinner
  if (loading || animeLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  // If error, show error message
  if (error || animeError) {
    return (
      <Container>
        <Alert severity="error">{error || animeError}</Alert>
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

  // If no games or anime in collection, show message
  if ((games.length === 0 && (!userAnime || userAnime.length === 0)) || (filteredGames.length === 0 && filteredAnime.length === 0)) {
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
        {/* Header with Welcome and Toggle */}
        <Box mb={3} display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h4">
            Welcome, {userInfo?.username}!
          </Typography>
          <ButtonGroup variant="contained" aria-label="content type toggle">
            <Button 
              onClick={() => setContentType('games')}
              variant={contentType === 'games' ? 'contained' : 'outlined'}
              sx={{
                bgcolor: contentType === 'games' ? 'primary.main' : 'transparent',
                '&:hover': {
                  bgcolor: contentType === 'games' ? 'primary.dark' : 'rgba(255, 255, 255, 0.08)'
                }
              }}
            >
              Games
            </Button>
            <Button 
              onClick={() => setContentType('anime')}
              variant={contentType === 'anime' ? 'contained' : 'outlined'}
              sx={{
                bgcolor: contentType === 'anime' ? 'primary.main' : 'transparent',
                '&:hover': {
                  bgcolor: contentType === 'anime' ? 'primary.dark' : 'rgba(255, 255, 255, 0.08)'
                }
              }}
            >
              Anime
            </Button>
          </ButtonGroup>
        </Box>
        {/* Games Section */}
        {contentType === 'games' && (
          <>
            <Typography variant="h5" sx={{ mt: 2, mb: 2 }}>
              Your Games
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
                  <MenuItem value="planned">Planned</MenuItem>
                  <MenuItem value="playing">Currently Playing</MenuItem>
                  <MenuItem value="completed">Completed</MenuItem>
                  <MenuItem value="dropped">Dropped</MenuItem>
                </Select>
              </FormControl>
            </Box>


            {/* Display filtered games */}
            <Grid container spacing={3}>
              {filteredGames.map((game) => (
                <Grid item xs={12} sm={6} md={4} key={game.id}>
                  <Card 
                    sx={{ 
                      cursor: 'pointer',
                      transition: 'transform 0.2s',
                      height: 350,
                      width: 240,
                      maxWidth: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      position: 'relative',
                      mx: 'auto',
                      boxShadow: 3,
                      borderRadius: 3,
                      bgcolor: '#181c24',
                      '&:hover': {
                        transform: 'scale(1.02)',
                        '& .action-buttons': {
                          opacity: 1
                        }
                      }
                    }}
                    onClick={() => handleGameClick(game)}
                  >
                    {/* Title at the very top */}
                    <Box sx={{
                      width: '100%',
                      bgcolor: '#222',
                      borderTopLeftRadius: 12,
                      borderTopRightRadius: 12,
                      p: 1.2,
                      minHeight: 52,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <Typography variant="h6" component="div" sx={{
                        color: '#ccc',
                        fontWeight: 600,
                        fontSize: 18,
                        textAlign: 'center',
                        width: '100%',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'normal',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                      }}>
                        {game.name}
                      </Typography>
                    </Box>
                    {/* Game cover image */}
                    <CardMedia
                      component="img"
                      image={game.background_image || 'https://via.placeholder.com/240x320'}
                      alt={game.name}
                      sx={{
                        height: 218,
                        width: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center',
                        background: '#222',
                      }}
                    />
                    {/* Game details */}
                    <CardContent sx={{
                      flexGrow: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      bgcolor: '#222',
                      borderBottomLeftRadius: 12,
                      borderBottomRightRadius: 12,
                      p: 1.5,
                      minHeight: 80,
                      boxSizing: 'border-box',
                      width: '100%',
                      flexShrink: 0
                    }}>
                      <Typography variant="body1" color="text.secondary" sx={{
                        color: '#bdbdbd',
                        mt: 0, mb: 0.5,
                        textAlign: 'center',
                        width: '100%'
                      }}>
                        Status: {game ? (game.user_status || 'Not played') : (anime.user_status || 'Not set')}
                      </Typography>
                      {(game ? game.user_status?.toLowerCase() !== 'planned' : anime.user_status?.toLowerCase() !== 'planned') && (
                        <Box display="flex" alignItems="center" sx={{ mt: 0 }}>
                          <Typography component="legend" sx={{ color: '#bdbdbd', mr: 1 }}>Rating:</Typography>
                          <Rating 
                            value={game ? (game.user_rating || 0) : Number(anime.user_rating)} 
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
          </>
        )}
        {/* Anime Section */}
        {contentType === 'anime' && (
          <>
            <Typography variant="h5" sx={{ mt: 2, mb: 2 }}>
              Your Anime
            </Typography>
            <Box mb={3}>
              <FormControl fullWidth>
                <InputLabel>Filter by Status</InputLabel>
                <Select
                  value={animeStatusFilter}
                  onChange={handleAnimeStatusFilterChange}
                  label="Filter by Status"
                >
                  <MenuItem value="all">All Anime</MenuItem>
                  <MenuItem value="planned">Planned</MenuItem>
                  <MenuItem value="watching">Watching</MenuItem>
                  <MenuItem value="completed">Completed</MenuItem>
                  <MenuItem value="dropped">Dropped</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Grid container spacing={3}>
              {filteredAnime.map((anime) => (
                <Grid item xs={12} sm={6} md={4} key={anime.id}>
                  <Card 
                    sx={{ 
                      cursor: 'pointer',
                      transition: 'transform 0.2s',
                      height: 350,
                      width: 240,
                      maxWidth: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      position: 'relative',
                      mx: 'auto',
                      boxShadow: 3,
                      borderRadius: 3,
                      bgcolor: '#181c24',
                      '&:hover': {
                        transform: 'scale(1.02)',
                        '& .action-buttons': {
                          opacity: 1
                        }
                      }
                    }}
                    onClick={() => navigate(`/anime/${anime.slug}`, { state: { anime } })}
                  >
                    {/* Title at the very top */}
                    <Box sx={{
                      width: '100%',
                      bgcolor: '#222',
                      borderTopLeftRadius: 12,
                      borderTopRightRadius: 12,
                      p: 1.2,
                      minHeight: 52,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <Typography variant="h6" component="div" sx={{
                        color: '#ccc',
                        fontWeight: 600,
                        fontSize: 18,
                        textAlign: 'center',
                        width: '100%',
                        overflow: 'wrap',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'normal',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                      }}>
                        {anime.title_english || anime.title}
                      </Typography>
                    </Box>
                    <CardMedia
                      component="img"
                      image={anime.images?.webp?.large_image_url || anime.images?.jpg?.large_image_url || 'https://via.placeholder.com/240x320'}
                      alt={anime.title_english || anime.title}
                      sx={{
                        height: 218,
                        width: '100%',
                        objectFit: 'fill',
                        objectPosition: 'center',
                        borderTopLeftRadius: 12,
                        borderTopRightRadius: 12,
                        background: '#222'
                      }}
                    />
                    <CardContent sx={{
                      flexGrow: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      bgcolor: '#222',
                      borderBottomLeftRadius: 12,
                      borderBottomRightRadius: 12,
                      p: 1.5,
                      minHeight: 80,
                      boxSizing: 'border-box',
                      width: '100%',
                      flexShrink: 0
                    }}>
                      <Typography variant="body1" color="text.secondary" sx={{
                        color: '#bdbdbd',
                        mt: 0, mb: 0.5,
                        textAlign: 'center',
                        width: '100%'
                      }}>
                        Status: {anime.user_status || 'Not set'}
                      </Typography>
                      {anime.user_status?.toLowerCase() !== 'planned' && (
                        <Box display="flex" alignItems="center" sx={{ mt: 0 }}>
                          <Typography component="legend" sx={{ color: '#bdbdbd', mr: 1 }}>Rating:</Typography>
                          <Rating 
                            value={Number(anime.user_rating)} 
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
                        onClick={(e) => handleAnimeUpdate(anime, e)}
                        color="primary"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton 
                        size="small" 
                        onClick={(e) => handleAnimeDelete(anime, e)}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </>
        )}

        <Dialog
          open={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
        >
          <DialogTitle>Remove {contentType === 'games' ? 'Game' : 'Anime'}</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to remove {contentType === 'games' 
                ? gameToDelete?.name 
                : (animeToDelete?.title_english || animeToDelete?.title)
              } from your collection?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
            <Button 
              onClick={contentType === 'games' ? handleDeleteConfirm : handleAnimeDeleteConfirm} 
              color="error"
            >
              Delete
            </Button>
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