import React, { useEffect, useState } from 'react';
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

  // Fetch anime details using custom hook
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

  const trailerEmbedUrl = anime.trailer?.embed_url;

  // Get YouTube video ID from embed URL
  const getYouTubeVideoId = (embedUrl) => {
    if (!embedUrl) return null;
    const match = embedUrl.match(/embed\/([^?/]+)/);
    return match ? match[1] : null;
  };

  // Get YouTube thumbnail URL
  const getYouTubeThumbnailUrl = (videoId) => {
    if (!videoId) return null;
    // Try maxresdefault first (highest quality)
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  };

  const videoId = getYouTubeVideoId(trailerEmbedUrl);
  const youtubeThumbnail = getYouTubeThumbnailUrl(videoId);

  const posterImg =
    youtubeThumbnail ||
    (anime.images?.webp?.large_image_url ||
      anime.images?.jpg?.large_image_url ||
      '/placeholder-image.jpg');

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Card sx={{ bgcolor: 'background.paper' }}>
        {/* Trailer section with play overlay */}
        <Box sx={{ position: 'relative', width: '100%', height: 400, borderRadius: 1, boxShadow: 3, mb: 2, overflow: 'hidden', background: '#000' }}>
          {showTrailer && trailerEmbedUrl ? (
    <CardMedia
      component="iframe"
      src={`${trailerEmbedUrl}?enablejsapi=0&controls=1`}
      allow="autoplay; encrypted-media"
      allowFullScreen
      loading="lazy"
      sandbox="allow-same-origin allow-scripts allow-forms allow-presentation"
              sx={{ width: '100%', height: '100%', border: 0 }}
    />
  ) : (
    <>
      <CardMedia
        component="img"
        image={posterImg}
        alt={anime.title}
                sx={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 1 }}
              />
              {trailerEmbedUrl && (
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