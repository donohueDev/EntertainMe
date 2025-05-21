import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, AppBar, Toolbar, IconButton, Typography, Container, Box } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import { UserProvider, useUser } from './context/userContext';

// Import pages
import HomePage from './pages/HomePage';
import GameDetailPage from './pages/gameDetailPage';
import SearchPage from './pages/searchPage';
import SignIn from './pages/LoginPage';
import Register from './pages/RegisterPage';
import Dashboard from './pages/AccountDashboard';

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

// Navigation component
const Navigation = () => {
  const { user } = useUser();
  const AccountScreen = user?.isLoggedIn === 'true' ? Dashboard : SignIn;

  return (
    <AppBar position="fixed" sx={{ top: 'auto', bottom: 0 }}>
      <Toolbar sx={{ justifyContent: 'space-around' }}>
        <IconButton component={Link} to="/" color="inherit">
          <HomeIcon />
        </IconButton>
        <IconButton component={Link} to="/search" color="inherit">
          <SearchIcon />
        </IconButton>
        <IconButton component={Link} to="/account" color="inherit">
          <PersonIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

// Main App component
const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <UserProvider>
        <Router>
          <Box sx={{ pb: 7 }}>
            <Container>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/game/:id" element={<GameDetailPage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/register" element={<Register />} />
                <Route path="/account" element={<SignIn />} />
              </Routes>
            </Container>
            <Navigation />
          </Box>
        </Router>
      </UserProvider>
    </ThemeProvider>
  );
};

export default App; 