import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, AppBar, Toolbar, IconButton, Container, Box, CircularProgress } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import { UserProvider, useUser } from './context/userContext';

// Import pages
import HomePage from './pages/HomePage';
import GameDetailPage from './pages/gameDetailPage';
import SearchPage from './pages/searchPage';
import LoginPage from './pages/LoginPage';
import Register from './pages/RegisterPage';
import AccountDashboard from './pages/AccountDashboard';
import AnimeDetailPage from './pages/animeDetailPage';

// Create dark theme
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ffffff',
    },
    background: {
      default: '#0A1929',
      paper: '#1A1A1A',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#0A1929',
        },
      },
    },
  },
});

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isInitializing } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isInitializing && !isAuthenticated) {
      navigate('/account', { replace: true });
    }
  }, [isAuthenticated, isInitializing, navigate]);

  if (isInitializing) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  // Only render children if authenticated
  return isAuthenticated ? children : null;
};

// Navigation component
const Navigation = () => {
  const { isAuthenticated, getUserInfo } = useUser();
  const navigate = useNavigate();

  const handleAccountClick = () => {
    if (!isAuthenticated) {
      navigate('/auth/login', { replace: true });
    } else {
      const userInfo = getUserInfo();
      navigate(`/user/${userInfo.username}/dashboard`, { replace: true });
    }
  };

  return (
    <AppBar position="fixed" sx={{ top: 0, bottom: 'auto', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar sx={{ justifyContent: 'space-around' }}>
        <IconButton component={Link} to="/" color="inherit">
          <HomeIcon />
        </IconButton>
        <IconButton component={Link} to="/search" color="inherit">
          <SearchIcon />
        </IconButton>
        <IconButton onClick={handleAccountClick} color="inherit">
          <PersonIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

// Create a new component to handle routing
const AppRoutes = () => {
  
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/game/:id" element={<GameDetailPage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/auth/register" element={<Register />} />
      <Route path="/auth/login" element={<LoginPage />} />
      <Route 
        path="/user/:username/dashboard" 
        element={
          <ProtectedRoute>
            <AccountDashboard />
          </ProtectedRoute>
        } 
      />
      <Route path="/anime/:slug" element={<AnimeDetailPage />} />
    </Routes>
  );
};

// Create a wrapper component to handle initialization
const AppContent = () => {
  const { isInitializing } = useUser();

  // Only show loading state while initializing
  if (isInitializing) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Router>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navigation />
        <Box component="main" sx={{ flexGrow: 1, pt: 8, pb: 7 }}>
          <Container>
            <AppRoutes />
          </Container>
        </Box>
      </Box>
    </Router>
  );
};

// Main App component
const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <UserProvider>
        <AppContent />
      </UserProvider>
    </ThemeProvider>
  );
};

export default App; 