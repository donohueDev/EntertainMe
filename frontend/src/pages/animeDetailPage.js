import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../context/userContext';
import API_BASE_URL from '../config';
import {
  Box,
  Card,
  CardMedia,
  Container,
  IconButton,
  Typography,
  CardContent,
  CircularProgress,
  Grid,
  Tooltip,
} from '@mui/material';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ReviewBox from '../components/ReviewBox';
import useFetchDetails from '../hooks/useFetchDetails';
import useUserContentRating from '../hooks/useUserContentRating';
import LoginPromptBox from '../components/LoginPromptBox';

const THUMBNAIL_CACHE_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

const getCachedThumbnail = (videoId) => {
  const cached = localStorage.getItem(`thumbnail_${videoId}`);
  if (!cached) return null;

  const { url, timestamp } = JSON.parse(cached);
  const isExpired = Date.now() - timestamp > THUMBNAIL_CACHE_DURATION;

  if (isExpired) {
    localStorage.removeItem(`thumbnail_${videoId}`);
    return null;
  }

  return url;
};

const setCachedThumbnail = (videoId, url) => {
  localStorage.setItem(`thumbnail_${videoId}`, JSON.stringify({
    url,
    timestamp: Date.now()
  }));
};

const AnimeDetailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const initialAnime = location.state?.anime;
  const [showTrailer, setShowTrailer] = useState(false);
  const { isAuthenticated } = useUser();
  const [youtubeApiReady, setYoutubeApiReady] = useState(false);
  const [displayedImageUrl, setDisplayedImageUrl] = useState('');
  
  // Refs
  const playerRef = useRef(null);
  const fetchStatusRef = useRef({
    attempted: false,
    warningLogged: false,
    currentTrailerUrl: null,
  });

  // Fetch anime details 
  const {
    data: anime,
    loading: animeLoading
  } = useFetchDetails(
    initialAnime?.slug ? `${API_BASE_URL}/api/anime/${initialAnime.slug}` : null,
    { initialData: initialAnime, dependencies: [initialAnime?.slug] }
  );

  // Use the comprehensive rating hook
  const {
    rating,
    setRating,
    status,
    setStatus,
    userContentData: userAnimeData,
    loading: ratingLoading,
    error: ratingError,
    setError: setRatingError,
    success: ratingSuccess,
    setSuccess: setRatingSuccess,
    submitRating,
    updateUserContentState
  } = useUserContentRating({
    contentType: 'anime',
    contentId: anime?.id
  });

  // Update state when user data changes
  useEffect(() => {
    updateUserContentState();
  }, [updateUserContentState]);

  const initializePlayer = useCallback(() => {
    if (window.YT && anime?.trailer?.embed_url && !playerRef.current) {
      const videoId = anime.trailer.embed_url.match(/embed\/([^?/]+)/)?.[1];
      if (videoId) {
        const playerContainer = document.getElementById('youtube-player');
        if (playerContainer) {
          playerRef.current = new window.YT.Player('youtube-player', {
            videoId,
            playerVars: {
              autoplay: 1,
              modestbranding: 1,
              rel: 0
            },
            events: {
              onStateChange: (event) => {
                if (event.data === window.YT.PlayerState.ENDED) {
                  // Safely cleanup player when video ends
                  if (playerRef.current) {
                    playerRef.current.destroy();
                    playerRef.current = null;
                  }
                  setShowTrailer(false);
                }
              }
            }
          });
        }
      }
    }
  }, [anime?.trailer?.embed_url]);

  // Handle play button click
  const handlePlayClick = useCallback(() => {
    setShowTrailer(true);
    if (youtubeApiReady) {
      // Use setTimeout to ensure the player div is rendered before initialization
      setTimeout(initializePlayer, 0);
    }
  }, [youtubeApiReady, initializePlayer]);

  // Load YouTube IFrame API
  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = () => {
        setYoutubeApiReady(true);
        if (showTrailer) {
          initializePlayer();
        }
      };
    } else {
      setYoutubeApiReady(true);
    }

    return () => {
      // Cleanup on unmount
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, [showTrailer, initializePlayer]);

  // Cleanup player when trailer is hidden
  useEffect(() => {
    if (!showTrailer && playerRef.current) {
      playerRef.current.destroy();
      playerRef.current = null;
    }
  }, [showTrailer]);

  // Reinitialize player when anime changes and trailer is showing
  useEffect(() => {
    if (showTrailer && youtubeApiReady && !playerRef.current) {
      initializePlayer();
    }
  }, [showTrailer, youtubeApiReady, initializePlayer]);

  // Set rating and status from userAnimeData
  useEffect(() => {
    if (userAnimeData) {
      setRating(userAnimeData.user_rating || 0);
      setStatus(userAnimeData.user_status || '');
    }
  }, [userAnimeData, setRating, setStatus]);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Manage image display and YouTube thumbnail loading
  useEffect(() => {
    if (!anime) return;

    const fallbackImageUrl = anime.images?.webp?.large_image_url || 
      anime.images?.jpg?.large_image_url || 
      '/placeholder-image.jpg';
    
    const currentTrailerEmbedUrl = anime?.trailer?.embed_url || null;

    // Reset status when anime changes
    if (fetchStatusRef.current.currentTrailerUrl !== currentTrailerEmbedUrl) {
      fetchStatusRef.current = {
        attempted: false,
        warningLogged: false,
        currentTrailerUrl: currentTrailerEmbedUrl
      };
    }

    // If no trailer embed URL, use fallback immediately
    if (!currentTrailerEmbedUrl) {
      setDisplayedImageUrl(fallbackImageUrl);
      return;
    }

    // If fetch already attempted for this specific trailer URL, do nothing further
    if (fetchStatusRef.current.attempted) {
      return;
    }

    // Get YouTube video ID from embed URL
    const getYouTubeVideoId = (embedUrl) => {
      if (!embedUrl) return null;
      const match = embedUrl.match(/embed\/([^?/]+)/);
      return match ? match[1] : null;
    };

    // Get YouTube thumbnail URL (maxresdefault first)
    const getYouTubeThumbnailUrl = (videoId) => {
      if (!videoId) return null;
      return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    };

    const videoId = getYouTubeVideoId(currentTrailerEmbedUrl);
    if (!videoId) {
      setDisplayedImageUrl(fallbackImageUrl);
      // console.log("Using fallback image as no video ID found in trailer embed URL.");
      return;
    }

    // Check cache first
    const cachedThumbnail = getCachedThumbnail(videoId);
    if (cachedThumbnail) {
      setDisplayedImageUrl(cachedThumbnail);
      // console.log(`Using cached thumbnail for video ID ${videoId}`);
      return;
    }

    const youtubeThumbnail = getYouTubeThumbnailUrl(videoId);
    
    // Set fallback image while we try to load YouTube thumbnail
    setDisplayedImageUrl(fallbackImageUrl);

    if (youtubeThumbnail) {
      // Mark fetch attempted for this trailer URL *before* initiating the fetch
      fetchStatusRef.current.attempted = true;

      fetch(youtubeThumbnail)
        .then(response => {
          if (fetchStatusRef.current.currentTrailerUrl === currentTrailerEmbedUrl) {
            if (response.ok) {
              setDisplayedImageUrl(youtubeThumbnail);
              // Cache the successful thumbnail URL
              setCachedThumbnail(videoId, youtubeThumbnail);
              // console.log("Cached YouTube thumbnail for video ID:", videoId);
            } else if (!fetchStatusRef.current.warningLogged) {
              console.warn(`YouTube thumbnail fetch failed with status ${response.status} for video ID ${videoId}`);
              fetchStatusRef.current.warningLogged = true;
            }
          }
        })
        .catch(error => {
          if (fetchStatusRef.current.currentTrailerUrl === currentTrailerEmbedUrl && !fetchStatusRef.current.warningLogged) {
            console.warn(`YouTube thumbnail fetch failed for video ID ${videoId}. Error: ${error}`);
            fetchStatusRef.current.warningLogged = true;
          }
        });
    } else {
      if (!fetchStatusRef.current.warningLogged) {
        console.warn('Could not get YouTube thumbnail URL.');
        fetchStatusRef.current.warningLogged = true;
      }
      fetchStatusRef.current.attempted = true;
    }
  }, [anime]);  // Re-run effect if anime changes

  if (animeLoading) {
    return (
      <Container>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 300 }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (!anime) return <div>Loading...</div>;

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Card sx={{ 
        borderRadius: 2,
        boxShadow: 'none',
        background: 'rgba(20, 24, 36, 0.98)',
        border: 'none',
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
              onClick={() => navigate(-1)}
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
          <Typography
            variant="h3"
            component="h1"
            sx={{
              color: 'white',
              fontWeight: 'bold',
              width: '100%',
              overflow: 'visible',
              fontSize: {
                xs: 'clamp(1.2rem, 6vw, 2.5rem)',
                sm: 'clamp(1.5rem, 5vw, 3rem)',
                md: 'clamp(2rem, 4vw, 3.5rem)',
                lg: 'clamp(2.5rem, 3vw, 4rem)'
              },
              lineHeight: 1.1,
              display: 'block',
              textAlign: 'left',
            }}
          >
            <span
              style={{
                display: 'block',
                width: '100%',
                fontFamily: 'inherit',
                fontWeight: 700,
                verticalAlign: 'middle',
              }}
            >
              {anime.title_english || anime.title}
            </span>
            {anime.title_japanese && (
              <span
                style={{
                  display: 'block',
                  fontWeight: 400,
                  color: '#bdbdbd',
                  fontSize: '2rem',
                  marginTop: 2,
                  letterSpacing: '0.05em',
                }}
              >
                {(anime.title_japanese || '').replace(/[A-Za-z]/g, '').trim()}
              </span>
            )}
          </Typography>
        </Box>

        {/* Trailer section with play overlay */}
        <Box sx={{ 
          position: 'relative', 
          width: '100%',
          paddingTop: '56.25%' // 16:9 aspect ratio
        }}>
          {showTrailer && anime.trailer?.embed_url ? (
            <Box
              id="youtube-player"
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                width: '100%',
                height: '100%'
              }}
            />
          ) : (
            <>
              <CardMedia
                component="img"
                image={displayedImageUrl}
                alt={anime.title}
                sx={{ 
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'fill',
                  borderRadius: 1 
                }}
              />
              {anime.trailer?.embed_url && (
                <IconButton
                  aria-label="play trailer"
                  onClick={handlePlayClick}
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    color: 'white',
                    background: 'rgba(0,0,0,0.5)',
                    fontSize: 80,
                    '&:hover': { background: 'rgba(0,0,0,0.7)' },
                  }}
                  size="large"
                >
                  <PlayCircleOutlineIcon sx={{ fontSize: 80 }} />
                </IconButton>
              )}
            </>
          )}
        </Box>
        {/* Anime details */}
        <CardContent>
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ color: '#bdbdbd', mb: 2, fontSize: '1.2rem', fontWeight: 500 }}>
              Anime Details
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  <strong>Episodes:</strong> {anime.episodes ?? 'N/A'}
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  <strong>Status:</strong> {anime.status ?? 'N/A'}
                </Typography>
                <Typography variant="body1" sx={{ color: 'white', mb: 2 }}>
                  <strong>Score:</strong> {anime.score ?? 'N/A'}
                </Typography>
                <Typography variant="body1" sx={{ color: 'white', mb: 2 }}>
                  <strong>Rating:</strong> {anime.rating ?? 'N/A'}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="body1" sx={{ color: 'white', mb: 2 }}>
                  <strong>Year:</strong> {anime.year ?? 'N/A'}
                </Typography>
                <Typography variant="body1" sx={{ color: 'white', mb: 2 }}>
                  <strong>Airing Dates:</strong> {
                    (() => {
                      const from = anime.aired_prop?.from;
                      const to = anime.aired_prop?.to;
                      const formatDate = (d) =>
                        d && d.year ? `${d.year}/${d.month?.toString().padStart(2, '0') ?? '??'}/${d.day?.toString().padStart(2, '0') ?? '??'}` : null;
                      const fromStr = formatDate(from);
                      const toStr = formatDate(to);
                      const isCurrentlyAiring = anime.status === 'Currently Airing';
                      if (fromStr && toStr) return `${fromStr} - ${toStr}`;
                      if (fromStr) return `${fromStr} - ${isCurrentlyAiring ? 'Present' : '?'}`;
                      return 'N/A';
                    })()
                  }
                </Typography>
                <Typography variant="body1" sx={{ color: 'white', mb: 2 }}>
                  <strong>Duration:</strong> {anime.duration ?? 'N/A'}
                </Typography>
                <Typography variant="body1" sx={{ color: 'white', mb: 2 }}>
                  <strong>Type:</strong> {anime.type ?? 'N/A'}
                </Typography>
              </Grid>
            </Grid>
          </Box>

          {/* User Rating Section */}
          {isAuthenticated ? (
            <ReviewBox
              contentType="anime"
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
              contentType="anime"
            />
          )}

          {/* Anime Description */}
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>
              Description
            </Typography>
            <Typography variant="body1" sx={{ color: 'white', whiteSpace: 'pre-line' }}>
              {(anime.synopsis || 'No description available.').replace(/\s*\[Written by MAL Rewrite\]$/, '')}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default AnimeDetailPage;