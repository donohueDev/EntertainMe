import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      // Footer will be at very bottom of page with padding above it
      sx={{
        py: 3,
        px: 2,
        mt: 'auto', // This pushes the footer to the bottom
        backgroundColor: 'transparent',
        borderTop: '1px solid #333',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 1
      }}
    >
      <Typography variant="body2" color="#999" align="center">
        Game data provided by{' '}
        <Link href="https://rawg.io/" target="_blank" rel="noopener" color="primary">
          RAWG Video Games Database API
        </Link>
      </Typography>
      <Typography variant="body2" color="#999" align="center">
        Anime data provided by{' '}
        <Link href="https://jikan.moe/" target="_blank" rel="noopener" color="primary">
          Jikan API
        </Link>
      </Typography>
      <Typography variant="body2" color="#666" align="center" sx={{ mt: 1 }}>
        © {new Date().getFullYear()} EntertainME. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
