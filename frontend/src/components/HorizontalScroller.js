import React, { useRef } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
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
}) => {
  const scrollContainerRef = useRef(null);

  const handleScroll = (direction) => {
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

  return (
    <Box sx={{ width: '100%', ...sx }}>
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
          onClick={() => handleScroll('left')}
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
          sx={{
            display: 'grid',
            gridAutoFlow: 'column',
            gridTemplateRows: `repeat(${rows}, 1fr)`,
            overflowX: 'auto',
            overflowY: 'auto',
            gap: 3,
            py: 1,
            px: 2,
            '&::-webkit-scrollbar': { display: 'none' },
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            height: 'auto',
            scrollBehavior: 'smooth',
            flexGrow: 1
          }}
        >
          {items.map((item, idx) =>
            renderCard(item, idx, onCardClick)
          )}
        </Box>
        {/* Right arrow */}
        <IconButton
          onClick={() => handleScroll('right')}
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
