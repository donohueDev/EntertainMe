import React, { useRef, useEffect } from 'react';
import { Box, IconButton, Typography, CircularProgress } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const HorizontalScroller = ({
  items = [],
  renderCard,
  title = '',
  onCardClick = null,
  height = 400,
  cardWidth = 200,
  cardGap = 24,
  rows = 2,
  sx = {},
  storageKey = '',
}) => {
  const scrollContainerRef = useRef(null);

  // Set up scroll restoration
  useEffect(() => {
    if (scrollContainerRef.current && storageKey) {
      // Disable smooth scrolling temporarily for instant restoration
      scrollContainerRef.current.style.scrollBehavior = 'auto';
      
      // Get the saved position from session storage
      const savedPosition = sessionStorage.getItem(`${storageKey}_scroll`);
      if (savedPosition) {
        scrollContainerRef.current.scrollLeft = parseInt(savedPosition, 10);
      }

      // Re-enable smooth scrolling after restoration
      setTimeout(() => {
        if (scrollContainerRef.current) {
          scrollContainerRef.current.style.scrollBehavior = 'smooth';
        }
      }, 100);
    }
  }, [storageKey, items]);

  // Save scroll position when scrolling
  const handleScroll = () => {
    if (scrollContainerRef.current && storageKey) {
      sessionStorage.setItem(`${storageKey}_scroll`, scrollContainerRef.current.scrollLeft.toString());
    }
  };

  const handleArrowScroll = (direction) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const containerWidth = container.clientWidth;
      const cardsPerView = Math.floor((containerWidth + cardGap) / (cardWidth + cardGap));
      const scrollAmount = (cardWidth + cardGap) * cardsPerView;
      const newScrollPosition = container.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
      container.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth',
      });
    }
  };

  if (!items || items.length === 0) {
    return (
      <Box sx={{ 
        width: '100%', 
        height: height, 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center' 
      }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', position: 'relative', ...sx }}>
      {title && (
        <Typography
          variant="h4"
          sx={{
            fontWeight: 'bold',
            fontFamily: 'Varela Round',
            textAlign: 'left',
            color: '#E0E0E0',
            mb: 3,
          }}
        >
          {title}
        </Typography>
      )}
      <Box sx={{ position: 'relative', width: '100%', display: 'flex', alignItems: 'center', gap: 2 }}>
        {/* Left arrow */}
        <IconButton
          onClick={() => handleArrowScroll('left')}
          sx={{
            backgroundColor: '#042454',
            '&:hover': { backgroundColor: '#374265' },
            color: 'white',
            width: 40,
            height: 40,
            flexShrink: 0,
          }}
        >
          <ArrowBackIosNewIcon />
        </IconButton>
        {/* Scroll container */}
        <Box
          ref={scrollContainerRef}
          onScroll={handleScroll}
          sx={{
            display: 'grid',
            gridAutoFlow: 'column dense',
            gridTemplateRows: `repeat(${rows}, auto)`,
            gridAutoColumns: 'min-content',
            overflowX: 'auto',
            overflowY: 'hidden',
            gap: 3,
            py: 1,
            px: 2,
            '&::-webkit-scrollbar': { display: 'none' },
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            flexGrow: 1,
            minHeight: height,
            alignItems: 'start',
          }}
        >
          {items.map((item, idx) =>
            renderCard(item, idx, onCardClick)
          )}
        </Box>
        {/* Right arrow */}
        <IconButton
          onClick={() => handleArrowScroll('right')}
          sx={{
            backgroundColor: '#042454',
            '&:hover': { backgroundColor: '#374265' },
            color: 'white',
            width: 40,
            height: 40,
            flexShrink: 0,
          }}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default HorizontalScroller;

