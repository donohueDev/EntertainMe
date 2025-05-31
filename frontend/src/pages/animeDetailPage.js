import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
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
  Rating
} from '@mui/material';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import ReviewBox from '../components/ReviewBox';
import useHandleRating from '../hooks/useHandleRating';
import useFetchDetails from '../hooks/useFetchDetails';
import useFetchUserContentData from '../hooks/useFetchUserContentData';
import LoginPromptBox from '../components/LoginPromptBox';

const AnimeDetailPage = () => {
  const location = useLocation();
  const initialAnime = location.state?.anime;
  const [showTrailer, setShowTrailer] = useState(false);
  const { isAuthenticated, getUserInfo } = useUser();
  const [status, setStatus] = useState('');
  const [rating, setRating] = useState(0);

  // State to manage the displayed image URL
  const [displayedImageUrl, setDisplayedImageUrl] = useState('');

  // Ref to track if fetch attempt for YouTube thumbnail has been made and if warning has been logged for this trailer
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

  // User-specific anime data
  const {
    userContentData: userAnimeData,
    setUserContentData: setUserAnimeData
  } = useFetchUserContentData({
    isAuthenticated,
    getUserInfo,
    contentId: anime?.id,
    contentType: 'anime'
  });

  // Rating handler hook
  const {
    handleRating: handleRatingHook,
    loading: ratingLoading,
    error: ratingError,
    setError: setRatingError,
    success: ratingSuccess,
    setSuccess: setRatingSuccess
  } = useHandleRating({
    contentType: 'anime',
    contentId: anime?.id,
    getUserContentData: undefined,
    usernameField: 'username',
    idField: 'animeId'
  });

  // Set rating and status from userAnimeData
  useEffect(() => {
    if (userAnimeData) {
      setRating(userAnimeData.user_rating || 0);
      setStatus(userAnimeData.user_status || '');
    }
  }, [userAnimeData]);

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
    const youtubeThumbnail = getYouTubeThumbnailUrl(videoId);

    // Set fallback image first while we try to load YouTube thumbnail
    setDisplayedImageUrl(fallbackImageUrl);

    if (youtubeThumbnail) {
      // Mark fetch attempted for this trailer URL *before* initiating the fetch
      fetchStatusRef.current.attempted = true;

      fetch(youtubeThumbnail)
        .then(response => {
          // Only proceed if this fetch attempt is for the current trailer URL
          if (fetchStatusRef.current.currentTrailerUrl === currentTrailerEmbedUrl) {
            if (!response.ok) {
              if (!fetchStatusRef.current.warningLogged) {
                console.warn(`YouTube thumbnail fetch failed with status ${response.status} for video ID ${videoId}. Using database image.`);
                fetchStatusRef.current.warningLogged = true;
              }
              // Fallback image is already set, no need to set it again
            } else {
              // YouTube thumbnail loaded successfully, update the displayed image
              setDisplayedImageUrl(youtubeThumbnail);
              console.log(`YouTube thumbnail loaded successfully for video ID ${videoId}`);
            }
          }
        })
        .catch(error => {
          // Only log error if this fetch attempt is for the current trailer URL
          if (fetchStatusRef.current.currentTrailerUrl === currentTrailerEmbedUrl) {
            if (!fetchStatusRef.current.warningLogged) {
              console.warn(`YouTube thumbnail fetch failed for video ID ${videoId}. Using database image. Error: ${error}`);
              fetchStatusRef.current.warningLogged = true;
            }
            // Fallback image is already set, no need to set it again
          }
        });
    } else {
      if (!fetchStatusRef.current.warningLogged) {
        console.warn('Could not get YouTube thumbnail URL.');
        fetchStatusRef.current.warningLogged = true;
      }
      // Mark attempted even if URL could not be derived, to prevent re-attempt
      fetchStatusRef.current.attempted = true;
      // Fallback image is already set, no need to set it again
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
      <Card sx={{ bgcolor: 'background.paper' }}>
        {/* Trailer section with play overlay */}
        <Box sx={{ 
          position: 'relative', 
          width: '100%',
          paddingTop: '56.25%' // 16:9 aspect ratio
        }}>
          {showTrailer && anime.trailer?.embed_url ? (
    <iframe
      src={anime.trailer.embed_url}
      allow="autoplay; encrypted-media; fullscreen"
      allowFullScreen
      loading="lazy"
      title={`${anime.title} trailer`}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        width: '100%',
        height: '100%',
        border: 0
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
          onClick={() => setShowTrailer(true)}
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
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              overflow: 'visible',
              position: 'relative',
            }}
          >
            <Typography
              variant="h3"
              component="h1"
              gutterBottom
              sx={{
                color: 'white',
                fontWeight: 'bold',
                mb: 2,
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
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ color: '#bdbdbd', mb: 2, fontSize: '1.2rem', fontWeight: 500 }}>
              Anime Details
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="body1" sx={{ color: 'white', mb: 2 }}>
                  <strong>Episodes:</strong> {anime.episodes ?? 'N/A'}
                </Typography>
                <Typography variant="body1" sx={{ color: 'white', mb: 2 }}>
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
          {/* User review and status section */}
      {isAuthenticated ? (
        <>
          {userAnimeData && (
            <Box sx={{ mb: 4, p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
              <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>
                Current Status:
              </Typography>
              <Typography variant="body1" sx={{ color: 'white', mb: 1 }}>
                Status: {userAnimeData.user_status || 'Not set'}
              </Typography>
              {userAnimeData.user_status !== 'planned' && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="body1" sx={{ color: 'white' }}>
                    Rating:
                  </Typography>
                  <Rating
                    value={userAnimeData.user_rating || 0}
                    readOnly
                    precision={0.5}
                    size="small"
                  />
                </Box>
              )}
            </Box>
          )}

          <ReviewBox
            contentType="anime"
            status={status}
            setStatus={setStatus}
            rating={rating}
            setRating={setRating}
            loading={ratingLoading}
            onSubmit={() => handleRatingHook({ rating, status, setUserContentData: setUserAnimeData })}
            error={ratingError}
            setError={setRatingError}
            success={ratingSuccess}
            setSuccess={setRatingSuccess}
          />
        </>
      ) : (
        <LoginPromptBox
          contentType="anime"
          actions={["rate", "track", "build your collection"]}
        />
      )}
      {/* Anime description */}
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