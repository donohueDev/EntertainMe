// accountDashboard.js is used to display reviewed games and anime to user
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/userContext';
import useFetchUserContentData, { invalidateUserDataCache } from '../hooks/useFetchUserContentData';
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
  DialogActions,
  Avatar
} from '@mui/material';
import Rating from '@mui/material/Rating';
import DeleteIcon from '@mui/icons-material/Delete';               
import EditIcon from '@mui/icons-material/Edit';
import EditContentDialog from '../components/EditContentDialog';
import Footer from '../components/Footer';
import theme, { commonStyles } from '../theme';

const AccountDashboard = () => {
  const [games, setGames] = useState([]);
  const [anime, setAnime] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredGames, setFilteredGames] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const navigate = useNavigate();
  const { isAuthenticated, userInfo, logout, getUserInfo } = useUser();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [gameToDelete, setGameToDelete] = useState(null);
  const [animeToDelete, setAnimeToDelete] = useState(null);
  const [deleteSuccessOpen, setDeleteSuccessOpen] = useState(false);
  const [deletedItemName, setDeletedItemName] = useState('');
  const [ratingSuccessOpen, setRatingSuccessOpen] = useState(false);
  const [ratedItemName, setRatedItemName] = useState('');
  const [newRatingValue, setNewRatingValue] = useState(0);

  // Add state for the new Edit Content Dialog
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [contentItemToEdit, setContentItemToEdit] = useState(null);

  // Content type dropdown state
  const [contentType, setContentType] = useState('games');

  // Reset filter when content type changes
  useEffect(() => {
    if (contentType === 'games') {
      setAnimeStatusFilter('all');
    } else {
      setStatusFilter('all');
    }
  }, [contentType]);

  // Use the reusable hook to fetch user's games
  const {
    userContentData: userGames,
    loading: gamesLoading,
    error: gamesError,
  } = useFetchUserContentData({
    isAuthenticated,
    getUserInfo: () => userInfo,
    contentId: null,
    contentType: 'games'
  });

  // Use the reusable hook to fetch user's anime
  const {
    userContentData: userAnime,
    loading: animeLoading,
    error: animeError,
  } = useFetchUserContentData({
    isAuthenticated,
    getUserInfo: () => userInfo,
    contentId: null,
    contentType: 'anime'
  });

  const [filteredAnime, setFilteredAnime] = useState([]);
  const [animeStatusFilter, setAnimeStatusFilter] = useState('all');

  useEffect(() => {
    if (userGames && Array.isArray(userGames)) {
      setGames(userGames);
      // Also update filtered games when userGames change
      if (statusFilter === 'all') {
        setFilteredGames(userGames);
      } else {
        setFilteredGames(userGames.filter(game =>
          game.user_status?.toLowerCase() === statusFilter.toLowerCase()
        ));
      }
    }
    // Remove setLoading and setError from here as they are handled by individual hook results
  }, [userGames, statusFilter]); // Depend on userGames and statusFilter

  useEffect(() => {
    if (userAnime && Array.isArray(userAnime)) {
      setAnime(userAnime);
      // Also update filtered anime when userAnime change
      if (animeStatusFilter === 'all') {
        setFilteredAnime(userAnime);
      } else {
        setFilteredAnime(userAnime.filter(anime =>
          anime.user_status?.toLowerCase() === animeStatusFilter.toLowerCase()
        ));
      }
    }
    // Remove setLoading and setError from here
  }, [userAnime, animeStatusFilter]); // Depend on userAnime and animeStatusFilter

  // Consolidate loading and error based on individual hook states
  useEffect(() => {
    setLoading(gamesLoading || animeLoading);
    setError(gamesError || animeError);
  }, [gamesLoading, animeLoading, gamesError, animeError]);

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
      await axios.delete(`${API_BASE_URL}/api/userGames/${userInfo.userId}/games/${gameToDelete.id}`);
      // Invalidate both specific game cache and all games cache
      invalidateUserDataCache(userInfo.userId, 'games', gameToDelete.id);
      setGames(games.filter(g => g.id !== gameToDelete.id));
      setFilteredGames(filteredGames.filter(g => g.id !== gameToDelete.id));
      setDeleteDialogOpen(false);
      // Add small delay before showing success dialog
      setTimeout(() => {
        setDeletedItemName(gameToDelete.name);
        setDeleteSuccessOpen(true);
        setGameToDelete(null);
      }, 300);
    } catch (error) {
      console.error('Failed to delete game:', error);
      setError('Failed to remove game from your collection. Please try again later.');
    }
  };

  const handleUpdateClick = (game, event) => {
    event.stopPropagation(); // Prevent card click
    // Use the new state and open the new dialog
    setContentItemToEdit({ ...game, type: 'game' });
    setIsEditDialogOpen(true);
  };

  const handleAnimeDelete = (anime, event) => {
    event.stopPropagation(); // Prevent card click
    setAnimeToDelete(anime);
    setDeleteDialogOpen(true);
  };

  const handleAnimeDeleteConfirm = async () => {
    try {
      await axios.delete(`${API_BASE_URL}/api/userAnimes/${userInfo.userId}/anime/${animeToDelete.id}`);
      // Invalidate both specific anime cache and all anime cache
      invalidateUserDataCache(userInfo.userId, 'anime', animeToDelete.id);
      setAnime(anime.filter(a => a.id !== animeToDelete.id));
      setFilteredAnime(filteredAnime.filter(a => a.id !== animeToDelete.id));
      setDeleteDialogOpen(false);
      // Add small delay before showing success dialog
      setTimeout(() => {
        setDeletedItemName(animeToDelete.title_english || animeToDelete.title);
        setDeleteSuccessOpen(true);
        setAnimeToDelete(null);
      }, 300);
    } catch (error) {
      console.error('Failed to delete anime:', error);
      setError('Failed to remove anime from your collection. Please try again later.');
    }
  };

  const handleAnimeUpdate = (anime, event) => {
    event.stopPropagation(); // Prevent card click
    // Use the new state and open the new dialog
    setContentItemToEdit({ ...anime, type: 'anime' });
    setIsEditDialogOpen(true);
  };

  // New handler for when the edit dialog successfully saves
  const handleEditSaveSuccess = (updatedItem, newRating) => {
    // Close edit dialog first
    setContentItemToEdit(null);

    // Update the local state immediately
    if (updatedItem.type === 'game') {
      const updatedGames = games.map(game =>
        game.id === updatedItem.id ? { ...game, user_rating: newRating, user_status: updatedItem.user_status } : game
      );
      setGames(updatedGames);
      setFilteredGames(updatedGames.filter(game =>
        statusFilter === 'all' ? true : game.user_status?.toLowerCase() === statusFilter.toLowerCase()
      ));
    } else {
      const updatedAnime = anime.map(a =>
        a.id === updatedItem.id ? { ...a, user_rating: newRating, user_status: updatedItem.user_status } : a
      );
      setAnime(updatedAnime);
      setFilteredAnime(updatedAnime.filter(a =>
        animeStatusFilter === 'all' ? true : a.user_status?.toLowerCase() === animeStatusFilter.toLowerCase()
      ));
    }
    
    // Invalidate the cache for future refreshes
    invalidateUserDataCache();

    // Add a small delay before showing the success dialog
    setTimeout(() => {
      const itemName = updatedItem.type === 'game' ? updatedItem.name : (updatedItem.title_english || updatedItem.title);
      setRatedItemName(itemName);
      setNewRatingValue(newRating);
      setRatingSuccessOpen(true);
    }, 300);
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

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <>
        <Container sx={{ flex: '1 0 auto', display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ flex: 1 }} mt={4}>
            {/* Header with Welcome and Toggle */}
            <Box mb={3} display="flex" justifyContent="space-between" alignItems="center">
              <Box display="flex" alignItems="center" gap={2}>
                {isAuthenticated && getUserInfo()?.avatar_url ? (
                  <Avatar 
                    src={getUserInfo().avatar_url} 
                    alt={getUserInfo().display_name || getUserInfo().username}
                    sx={{ 
                      width: 64, 
                      height: 64,
                      border: '2px solid goldenrod',
                      boxShadow: '0 0 10px rgba(218, 165, 32, 0.3)'
                    }}
                  />
                ) : (
                  <Avatar 
                    sx={{ 
                      width: 64, 
                      height: 64,
                      border: '2px solid goldenrod',
                      boxShadow: '0 0 10px rgba(218, 165, 32, 0.3)',
                      bgcolor: 'rgba(218, 165, 32, 0.2)'
                    }}
                  >
                    {getUserInfo()?.display_name?.[0] || getUserInfo()?.username?.[0] || '?'}
                  </Avatar>
                )}
                <Typography variant="h4" sx={{
                  background: "radial-gradient(at center bottom, rgb(253, 224, 71), rgb(120, 53, 15))",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  textShadow: "0 0 15px rgba(253, 224, 71, 0.3)"
                }}>
                  Welcome, {userInfo?.display_name || userInfo?.username}!
                </Typography>
              </Box>
              <ButtonGroup 
                variant="contained" 
                aria-label="content type toggle"
                sx={{
                  '& .MuiButton-root': {
                    ...theme.components.MuiButton.styleOverrides.root['&.MuiButton-contained'],
                    '&.active': {
                      borderColor: 'goldenrod !important'
                    }
                  }
                }}
              >
                <Button 
                  onClick={() => setContentType('games')}
                  className={contentType === 'games' ? 'active' : ''}
                  sx={{
                    ...theme.components.MuiButton.styleOverrides.root,
                    color: contentType === 'games' ? 'goldenrod' : '#FFFFFF',
                    boxShadow: contentType === 'games' 
                      ? '0 0 10px rgba(218, 165, 32, 0.3)' 
                      : 'none'
                  }}
                >
                  Games
                </Button>
                <Button 
                  onClick={() => setContentType('anime')}
                  className={contentType === 'anime' ? 'active' : ''}
                  sx={{
                    ...theme.components.MuiButton.styleOverrides.root,
                    color: contentType === 'anime' ? 'goldenrod' : '#FFFFFF',
                    boxShadow: contentType === 'anime' 
                      ? '0 0 10px rgba(218, 165, 32, 0.3)' 
                      : 'none'
                  }}
                >
                  Anime
                </Button>
              </ButtonGroup>
            </Box>

            {contentType === 'games' && (
              <>
                <Typography variant="h5" sx={{ 
                  mt: 2, 
                  mb: 2,
                  color: 'white',
                  textShadow: '0 0 10px rgba(218, 165, 32, 0.3)'
                }}>
                  Your Games
                </Typography>
                <Box mb={3}>
                  <FormControl fullWidth>
                    <InputLabel sx={{ 
                      color: 'rgba(255, 255, 255, 0.7)',
                      '&.Mui-focused': { color: 'goldenrod' }
                    }}>Filter by Status</InputLabel>
                    <Select
                      value={statusFilter}
                      onChange={handleStatusFilterChange}
                      label="Filter by Status"
                      sx={{
                        ...theme.components.MuiSelect.styleOverrides.root
                      }}
                    >
                      <MenuItem value="all">All Games</MenuItem>
                      <MenuItem value="planned">Planned</MenuItem>
                      <MenuItem value="playing">Currently Playing</MenuItem>
                      <MenuItem value="completed">Completed</MenuItem>
                      <MenuItem value="dropped">Dropped</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                {filteredGames.length > 0 ? (
                  <Grid container spacing={3}>
                    {filteredGames.map((game) => (
                      <Grid item xs={12} sm={6} md={4} key={game.id}>
                        <Card 
                          sx={{
                            cursor: 'pointer',
                            height: 350,
                            width: 240,
                            maxWidth: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            position: 'relative',
                            mx: 'auto',
                            ...commonStyles.goldenBorder,
                            ...commonStyles.cardHover,
                            '&:hover': {
                              ...commonStyles.cardHover['&:hover'],
                              '& .action-buttons': {
                                opacity: 1
                              }
                            }
                          }}
                          onClick={() => handleGameClick(game)}
                        >
                          <Box sx={{
                            width: '100%',
                            bgcolor: 'rgba(0, 0, 0, 0.3)',
                            borderTopLeftRadius: 12,
                            borderTopRightRadius: 12,
                            p: 1.2,
                            minHeight: 52,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderBottom: '1px solid rgba(218, 165, 32, 0.2)'
                          }}>
                            <Typography variant="h6" component="div" sx={{
                              color: '#FFFFFF',
                              fontWeight: 600,
                              fontSize: 18,
                              textAlign: 'center',
                              width: '100%',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                            }}>
                              {game.name}
                            </Typography>
                          </Box>
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
                          <CardContent sx={{
                            flexGrow: 0,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            bgcolor: 'rgba(0, 0, 0, 0.3)',
                            borderBottomLeftRadius: 12,
                            borderBottomRightRadius: 12,
                            p: 1.5,
                            minHeight: 80,
                            boxSizing: 'border-box',
                            width: '100%',
                            flexShrink: 0,
                            borderTop: '1px solid rgba(218, 165, 32, 0.2)'
                          }}>
                            <Typography variant="body1" sx={{
                              color: '#FFFFFF',
                              mt: 0, 
                              mb: 0.5,
                              textAlign: 'center',
                              width: '100%'
                            }}>
                              Status: {game.user_status || 'Not played'}
                            </Typography>
                            {game.user_status?.toLowerCase() !== 'planned' && (
                              <Box display="flex" alignItems="center" sx={{ mt: 0 }}>
                                <Typography component="legend" sx={{ 
                                  color: '#FFFFFF', 
                                  mr: 1 
                                }}>Rating:</Typography>
                                <Rating 
                                  value={game.user_rating || 0}
                                  readOnly 
                                  precision={0.5}
                                  sx={theme.components.MuiRating.styleOverrides}
                                />
                              </Box>
                            )}
                          </CardContent>
                          <Box 
                            className="action-buttons"
                            sx={{
                              position: 'absolute',
                              top: 220,
                              right: 8,
                              display: 'flex',
                              gap: 1,
                              opacity: 0,
                              transition: 'opacity 0.2s',
                              backgroundColor: 'rgba(5, 20, 38, 0.9)',
                              borderRadius: 1,
                              padding: 0.5,
                              border: '1px solid rgba(218, 165, 32, 0.3)',
                              '& .MuiIconButton-root': {
                                '& .MuiSvgIcon-root': {
                                  color: '#FFFFFF'
                                },
                                '&:hover': {
                                  backgroundColor: 'rgba(255, 255, 255, 0.1)'
                                }
                              }
                            }}
                          >
                            <IconButton 
                              size="small" 
                              onClick={(e) => handleUpdateClick(game, e)}
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton 
                              size="small" 
                              onClick={(e) => handleDeleteClick(game, e)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Box>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <Box textAlign="center" mt={4}>
                    <Typography variant="body1" sx={{ 
                      color: 'rgba(255, 255, 255, 0.7)',
                      mb: 2 
                    }} paragraph>
                      {`You haven't added any ${contentType} to your ${statusFilter} collection yet`}
                    </Typography>
                    <Typography variant="body1" sx={{ 
                      color: 'rgba(255, 255, 255, 0.7)',
                      mb: 3 
                    }} paragraph>
                      Browse our collection and start adding to your {contentType}!
                    </Typography>
                    <Button 
                      variant="contained" 
                      onClick={() => navigate('/')}
                      sx={{
                        bgcolor: '#051426',
                        border: '1px solid rgba(218, 165, 32, 0.5)',
                        color: 'white',
                        '&:hover': {
                          bgcolor: '#051426',
                          border: '1px solid goldenrod',
                          boxShadow: '0 0 5px rgba(218, 165, 32, 0.3)'
                        }
                      }}
                    >
                      Browse Content!
                    </Button>
                  </Box>
                )}
              </>
            )}
            {/* Anime Section */}
            {contentType === 'anime' && (
              <>
                <Typography variant="h5" sx={{ 
                  mt: 2, 
                  mb: 2,
                  color: 'white',
                  textShadow: '0 0 10px rgba(218, 165, 32, 0.3)'
                }}>
                  Your Anime
                </Typography>
                <Box mb={3}>
                  <FormControl fullWidth>
                    <InputLabel sx={{ 
                      color: 'rgba(255, 255, 255, 0.7)',
                      '&.Mui-focused': { color: 'goldenrod' }
                    }}>Filter by Status</InputLabel>
                    <Select
                      value={animeStatusFilter}
                      onChange={handleAnimeStatusFilterChange}
                      label="Filter by Status"
                      sx={{
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'rgba(218, 165, 32, 0.5)'
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'goldenrod'
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'goldenrod'
                        },
                        '& .MuiSelect-icon': {
                          color: 'goldenrod'
                        },
                        color: 'white'
                      }}
                    >
                      <MenuItem value="all">All Anime</MenuItem>
                      <MenuItem value="planned">Planned</MenuItem>
                      <MenuItem value="watching">Watching</MenuItem>
                      <MenuItem value="completed">Completed</MenuItem>
                      <MenuItem value="dropped">Dropped</MenuItem>
                      <MenuItem value="re-watching">Re-watching</MenuItem>
                      <MenuItem value="paused">Paused</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                {filteredAnime.length > 0 ? (
                  <Grid container spacing={3}>
                    {filteredAnime.map((anime) => (
                      <Grid item xs={12} sm={6} md={4} key={anime.id}>
                         <Card 
                          sx={{
                            cursor: 'pointer',
                            height: 350,
                            width: 240,
                            maxWidth: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            position: 'relative',
                            mx: 'auto',
                            ...commonStyles.goldenBorder,
                            ...commonStyles.cardHover,
                            '&:hover': {
                              ...commonStyles.cardHover['&:hover'],
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
                            bgcolor: 'rgba(0, 0, 0, 0.3)',
                            borderTopLeftRadius: 12,
                            borderTopRightRadius: 12,
                            p: 1.2,
                            minHeight: 52,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderBottom: '1px solid rgba(218, 165, 32, 0.2)'
                          }}>
                            <Typography variant="h6" component="div" sx={{
                              color: '#FFFFFF',
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
                            bgcolor: 'rgba(0, 0, 0, 0.3)',
                            borderBottomLeftRadius: 12,
                            borderBottomRightRadius: 12,
                            p: 1.5,
                            minHeight: 80,
                            boxSizing: 'border-box',
                            width: '100%',
                            flexShrink: 0,
                            borderTop: '1px solid rgba(218, 165, 32, 0.2)'
                          }}>
                            <Typography variant="body1" sx={{
                              color: 'rgba(255, 255, 255, 0.9)',
                              mt: 0, 
                              mb: 0.5,
                              textAlign: 'center',
                              width: '100%'
                            }}>
                              Status: {anime.user_status || 'Not set'}
                            </Typography>
                            {anime.user_status?.toLowerCase() !== 'planned' && (
                              <Box display="flex" alignItems="center" sx={{ mt: 0 }}>
                                <Typography component="legend" sx={{ 
                                  color: 'rgba(255, 255, 255, 0.9)', 
                                  mr: 1 
                                }}>Rating:</Typography>
                                <Rating 
                                  value={Number(anime.user_rating)}
                                  readOnly 
                                  precision={0.5}
                                  sx={{
                                    '& .MuiRating-iconFilled': {
                                      color: 'goldenrod'
                                    }
                                  }}
                                />
                              </Box>
                            )}
                          </CardContent>
                          <Box 
                            className="action-buttons"
                            sx={{
                              position: 'absolute',
                              top: 220,
                              right: 8,
                              display: 'flex',
                              gap: 1,
                              opacity: 0,
                              transition: 'opacity 0.2s',
                              backgroundColor: 'rgba(5, 20, 38, 0.95)',
                              borderRadius: 1,
                              padding: 0.5,
                              border: '1px solid rgba(255, 255, 255, 0.2)',
                              '& .MuiIconButton-root': {
                                '& .MuiSvgIcon-root': {
                                  color: '#FFFFFF'
                                },
                                '&:hover': {
                                  backgroundColor: 'rgba(255, 255, 255, 0.1)'
                                }
                              }
                            }}
                          >                        <IconButton 
                                size="small" 
                                onClick={(e) => handleAnimeUpdate(anime, e)}
                              >
                                <EditIcon />
                              </IconButton>
                              <IconButton 
                                size="small" 
                                onClick={(e) => handleAnimeDelete(anime, e)}
                              >
                                <DeleteIcon />
                              </IconButton>
                          </Box>
                            </Card>
                          </Grid>
                        ))}
                      </Grid>
                    ) : (
                       <Box textAlign="center" mt={4}>
                         <Typography variant="body1" sx={{ 
                           color: 'rgba(255, 255, 255, 0.7)',
                           mb: 2 
                         }} paragraph>
                              {`You haven't added any ${contentType} to your ${contentType === 'games' ? statusFilter : animeStatusFilter} collection yet`}
                            </Typography>
                            <Typography variant="body1" sx={{ 
                              color: 'rgba(255, 255, 255, 0.7)',
                              mb: 3 
                            }} paragraph>
                              Browse our collection and start adding to your {contentType}! 
                            </Typography>
                             <Button 
                             variant="contained" 
                             onClick={() => navigate('/')}
                             sx={{
                               bgcolor: '#051426',
                               border: '1px solid rgba(218, 165, 32, 0.5)',
                               color: 'white',
                               '&:hover': {
                                 bgcolor: '#051426',
                                 border: '1px solid goldenrod',
                                 boxShadow: '0 0 5px rgba(218, 165, 32, 0.3)'
                               }
                             }}
                           >
                             Browse Content!
                           </Button>
                        </Box>
                      )}
                    </>
                  )}

                  <Dialog
                    open={deleteDialogOpen}
                    onClose={() => setDeleteDialogOpen(false)}
                    maxWidth="md"
                    PaperProps={{
                      sx: {
                        ...theme.components.MuiDialog.styleOverrides.paper,
                        minWidth: 400
                      }
                    }}
                  >
                    <DialogTitle sx={theme.components.MuiDialogTitle.styleOverrides.root}>
                      Remove {contentType === 'games' ? 'Game' : 'Anime'}
                    </DialogTitle>
                    <DialogContent sx={{ bgcolor: '#051426', pt: 2 }}>
                      <Typography sx={{ color: '#FFFFFF', mt: 2.5 }}>
                        Are you sure you want to remove {contentType === 'games' 
                          ? gameToDelete?.name 
                          : (animeToDelete?.title_english || animeToDelete?.title)
                        } from your collection?
                      </Typography>
                    </DialogContent>
                    <DialogActions sx={{
                      borderTop: '1px solid rgba(218, 165, 32, 0.2)',
                      padding: 2,
                      bgcolor: '#051426'
                    }}>
                      <Button 
                        onClick={() => setDeleteDialogOpen(false)}
                        sx={{ 
                          color: 'rgba(255, 255, 255, 0.7)',
                          '&:hover': {
                            color: '#FFFFFF',
                            backgroundColor: 'rgba(255, 255, 255, 0.1)'
                          }
                        }}
                      >
                        Cancel
                      </Button>
                      <Button 
                        onClick={contentType === 'games' ? handleDeleteConfirm : handleAnimeDeleteConfirm}
                        variant="contained"
                        sx={{
                          bgcolor: '#051426',
                          border: '1px solid rgba(255, 59, 59, 0.5)',
                          color: 'rgb(255, 59, 59)',
                          '&:hover': {
                            bgcolor: '#051426',
                            border: '1px solid rgb(255, 59, 59)',
                            boxShadow: '0 0 5px rgba(255, 59, 59, 0.3)'
                          }
                        }}
                      >
                        Delete
                      </Button>
                    </DialogActions>
                  </Dialog>

                  {/* Use the new EditContentDialog component */}
                  <EditContentDialog
                    open={isEditDialogOpen}
                    item={contentItemToEdit}
                    onClose={() => setIsEditDialogOpen(false)}
                    onSaveSuccess={handleEditSaveSuccess}
                  />

                  {/* Success Dialog */}
                  <Dialog
                    open={deleteSuccessOpen}
                    onClose={() => setDeleteSuccessOpen(false)}
                    maxWidth="md"
                    PaperProps={{
                      sx: {
                        ...theme.components.MuiDialog.styleOverrides.paper,
                        minWidth: 400
                      }
                    }}
                  >
                    <DialogTitle sx={theme.components.MuiDialogTitle.styleOverrides.root}>
                      Successfully Removed
                    </DialogTitle>
                    <DialogContent sx={{ bgcolor: '#051426', pt: 2 }}>
                      <Typography sx={{ color: '#FFFFFF', mt: 2.5 }}>
                        {deletedItemName} has been removed from your collection.
                      </Typography>
                    </DialogContent>
                    <DialogActions sx={{
                      borderTop: '1px solid rgba(218, 165, 32, 0.2)',
                      padding: 2,
                      bgcolor: '#051426'
                    }}>
                      <Button 
                        onClick={() => setDeleteSuccessOpen(false)}
                        variant="contained"
                        sx={theme.components.MuiButton.styleOverrides.root}
                      >
                        OK
                      </Button>
                    </DialogActions>
                  </Dialog>

                  {/* Rating Success Dialog */}
                  <Dialog
                    open={ratingSuccessOpen}
                    onClose={() => setRatingSuccessOpen(false)}
                    PaperProps={{
                      sx: {
                        bgcolor: 'rgba(5, 20, 38, 0.95)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(218, 165, 32, 0.2)',
                        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                        color: theme.palette.text.primary
                      }
                    }}
                  >
                    <DialogTitle sx={{ textAlign: 'center' }}>Rating Updated</DialogTitle>
                    <DialogContent>
                      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, py: 2 }}>
                        <Typography>{ratedItemName} has been rated</Typography>
                        <Rating 
                          value={Number(newRatingValue)}
                          readOnly 
                          precision={0.5}
                          size="large" 
                          sx={{
                            '& .MuiRating-iconFilled': {
                              color: 'goldenrod'
                            }
                          }} 
                        />
                      </Box>
                    </DialogContent>
                    <DialogActions>
                      <Button
                        onClick={() => setRatingSuccessOpen(false)}
                        variant="contained"
                        sx={{
                          bgcolor: '#051426',
                          border: '1px solid rgba(218, 165, 32, 0.5)',
                          color: 'white',
                          '&:hover': {
                            bgcolor: '#051426',
                            border: '1px solid goldenrod',
                            boxShadow: '0 0 5px rgba(218, 165, 32, 0.3)'
                          }
                        }}
                      >
                        Close
                      </Button>
                    </DialogActions>
                  </Dialog>

                  <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2, mt:4 }}>
                    <Button
                      variant="contained"
                      onClick={handleLogout}
                      sx={{
                        bgcolor: '#051426',
                        border: '1px solid rgba(218, 165, 32, 0.5)',
                        color: 'white',
                        '&:hover': {
                          bgcolor: '#051426',
                border: '1px solid goldenrod',
                boxShadow: '0 0 5px rgba(218, 165, 32, 0.3)'
              }
            }}
          >
            Logout
          </Button>
        </Box>
        <Footer />
       </Box>
      </Container>
    </>
  </Box>
);
}

export default AccountDashboard;