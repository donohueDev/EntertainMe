import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, AppBar, Toolbar, IconButton, Typography, Container, Box, CircularProgress } from '@mui/material';
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

// Create dark theme
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ffffff',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
  },
});

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    // Check both the user context and localStorage to ensure proper authentication
    const isAuthenticated = user?.isLoggedIn === 'true' && 
                          localStorage.getItem('loggedIn') === 'true' && 
                          localStorage.getItem('userId') && 
                          localStorage.getItem('username');

    if (!isAuthenticated) {
      navigate('/account', { replace: true });
    }
  }, [user, navigate]);

  // Double check authentication before rendering
  const isAuthenticated = user?.isLoggedIn === 'true' && 
                         localStorage.getItem('loggedIn') === 'true' && 
                         localStorage.getItem('userId') && 
                         localStorage.getItem('username');

  if (!isAuthenticated) {
    return null;
  }

  return children;
};

// Navigation component
const Navigation = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  const handleAccountClick = () => {
    // Check both the user context and localStorage
    const isAuthenticated = user?.isLoggedIn === 'true' && 
                          localStorage.getItem('loggedIn') === 'true' && 
                          localStorage.getItem('userId') && 
                          localStorage.getItem('username');

    if (!isAuthenticated) {
      navigate('/account', { replace: true });
    } else {
      navigate('/account/dashboard', { replace: true });
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
  const { user } = useUser();
  
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/game/:id" element={<GameDetailPage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/account" element={<LoginPage />} />
      <Route 
        path="/account/dashboard" 
        element={
          <ProtectedRoute>
            <AccountDashboard />
          </ProtectedRoute>
        } 
      />
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