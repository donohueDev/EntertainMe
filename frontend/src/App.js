import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, AppBar, Toolbar, IconButton, Container, Box, CircularProgress, Menu, MenuItem, ListItemIcon, ListItemText, Avatar } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { UserProvider, useUser } from './context/userContext';
import theme from './theme';

// Import pages
import HomePage from './pages/HomePage';
import GameDetailPage from './pages/gameDetailPage';
import SearchPage from './pages/searchPage';
import LoginPage from './pages/LoginPage';
import Register from './pages/RegisterPage';
import AccountDashboard from './pages/AccountDashboard';
import AnimeDetailPage from './pages/animeDetailPage';
import ProfilePage from './pages/ProfilePage';
import VerifyEmailPage from './pages/VerifyEmailPage';
import VerificationSuccessPage from './pages/VerificationSuccessPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import ChangeForgottenPasswordPage from './pages/ChangeForgottenPasswordPage';
import OAuthCallback from './pages/OAuthCallback';

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isInitializing } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('ProtectedRoute - Auth state:', { isAuthenticated, isInitializing });
    if (!isInitializing && !isAuthenticated) {
      console.log('ProtectedRoute - Not authenticated, redirecting to login');
      navigate('/auth/login', { replace: true });
    }
  }, [isAuthenticated, isInitializing, navigate]);

  if (isInitializing) {
    console.log('ProtectedRoute - Initializing, showing loading spinner');
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  // Only render children if authenticated
  // console.log('ProtectedRoute - Rendering children:', isAuthenticated);
  return isAuthenticated ? children : null;
};

// Navigation component
const Navigation = () => {
  const { isAuthenticated, getUserInfo, logout } = useUser();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleAccountClick = (event) => {
    if (!isAuthenticated) {
      navigate('/auth/login', { replace: true });
    } else {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
    navigate('/', { replace: true });
  };

  const handleMenuItemClick = (path) => {
    if (path === '/logout') {
      handleLogout();
    } else {
      const userInfo = getUserInfo();
      navigate(`/user/${userInfo.username}${path}`);
      handleMenuClose();
    }
  };

  return (
    <AppBar position="fixed" sx={{ 
        top: 0, 
        bottom: 'auto', 
        zIndex: (theme) => theme.zIndex.drawer + 1,
        bgcolor: 'rgba(5, 20, 38, 0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(218, 165, 32, 0.2)',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)'
      }}>
      <Toolbar sx={{ justifyContent: 'space-around' }}>
        <IconButton 
          component={Link} 
          to="/" 
          sx={{ 
            gap: 1,
            color: '#FFFFFF',
            '& .MuiSvgIcon-root': {
              background: 'radial-gradient(at center bottom, rgb(253, 224, 71), rgb(120, 53, 15))',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            },
            textShadow: '0 0 15px rgba(253, 224, 71, 0.3)',
            '&:hover': {
              transform: 'scale(1.05)',
              transition: 'transform 0.2s ease-in-out'
            }
          }}
        >
          <HomeIcon />
          Home
        </IconButton>
        <IconButton 
          component={Link} 
          to="/search" 
          sx={{ 
            gap: 1,
            color: '#FFFFFF',
            '& .MuiSvgIcon-root': {
              background: 'radial-gradient(at center bottom, rgb(253, 224, 71), rgb(120, 53, 15))',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            },
            textShadow: '0 0 15px rgba(253, 224, 71, 0.3)',
            '&:hover': {
              transform: 'scale(1.05)',
              transition: 'transform 0.2s ease-in-out'
            }
          }}
        >
          <SearchIcon />
          Search
        </IconButton>
        <IconButton
          onClick={handleAccountClick}
          aria-controls="account-menu"
          aria-haspopup="true"
          sx={{ 
            gap: 1,
            color: '#FFFFFF',
            '& .MuiSvgIcon-root': {
              background: 'radial-gradient(at center bottom, rgb(253, 224, 71), rgb(120, 53, 15))',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            },
            textShadow: '0 0 15px rgba(253, 224, 71, 0.3)',
            '&:hover': {
              transform: 'scale(1.05)',
              transition: 'transform 0.2s ease-in-out'
            }
          }}
        >
          {isAuthenticated && getUserInfo()?.avatar_url ? (
            <Avatar 
              src={getUserInfo().avatar_url} 
              alt={getUserInfo().display_name || getUserInfo().username}
              sx={{ 
                width: 32, 
                height: 32,
                border: '2px solid goldenrod',
                boxShadow: '0 0 10px rgba(218, 165, 32, 0.3)'
              }}
            />
          ) : (
            <PersonIcon />
          )}
          Account
        </IconButton>
        <Menu
          id="account-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 4px 12px rgba(0, 0, 0, 0.5))',
              mt: 1.5,
              bgcolor: 'rgba(5, 20, 38, 0.95)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(218, 165, 32, 0.2)',
              borderRadius: 2,
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'rgba(5, 20, 38, 0.95)',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
                border: '1px solid rgba(218, 165, 32, 0.2)',
                borderBottom: 'none',
                borderRight: 'none'
              },
              '& .MuiMenuItem-root': {
                px: 2,
                py: 1.5,
                color: '#FFFFFF',
                transition: 'all 0.2s ease-in-out',
                '& .MuiListItemIcon-root': { 
                  color: 'goldenrod',
                  transition: 'color 0.2s ease-in-out'
                },
                '&:hover': {
                  bgcolor: 'rgba(218, 165, 32, 0.1)',
                  '& .MuiListItemIcon-root': { 
                    color: '#FFFFFF'
                  }
                },
              },
            },
          }}
        >
          <MenuItem onClick={() => handleMenuItemClick('/dashboard')}>
            <ListItemIcon>
              <DashboardIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </MenuItem>
          <MenuItem onClick={() => handleMenuItemClick('/profile')}>
            <ListItemIcon>
              <AccountCircleIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </MenuItem>
          <MenuItem onClick={() => handleMenuItemClick('/logout')}>
            <ListItemIcon>
              <LogoutIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </MenuItem>
        </Menu>

      </Toolbar>
    </AppBar>
  );
};

// Auth layout component
const AuthLayout = ({ children }) => {
  return (
    <Box sx={{ 
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      py: 4
    }}>
      {children}
    </Box>
  );
};

// Main layout component
const MainLayout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navigation />
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          pt: 8, 
          pb: 7,
          minHeight: '100vh', // Ensure minimum full viewport height
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Container sx={{ 
          flex: 1,
          display: 'flex',
          flexDirection: 'column'
        }}>
          {children}
        </Container>
      </Box>
    </Box>
  );
};

// Refactored AppRoutes to separate auth and main app routes
const AppRoutes = () => {
  return (
    <Routes>
      {/* Auth routes: with auth layout */}
      <Route
        path="/auth/*"
        element={
          <AuthLayout>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<Register />} />
              <Route path="/verify-email" element={<VerifyEmailPage />} />
              <Route path="/verify-email-sent" element={<VerifyEmailPage />} />
              <Route path="/verify-email-success" element={<VerificationSuccessPage />} />
              <Route path="/forgot-password" element={<ResetPasswordPage />} />
              <Route path="/reset-password" element={<ChangeForgottenPasswordPage />} />
              <Route path="/oauth-callback" element={<OAuthCallback />} />
            </Routes>
          </AuthLayout>
        }
      />

      {/* Main app routes: with main layout */}
      <Route
        path="*"
        element={
          <MainLayout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/game/:id" element={<GameDetailPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/user/:username/dashboard" element={<ProtectedRoute><AccountDashboard /></ProtectedRoute>} />
              <Route path="/user/:username/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
              <Route path="/anime/:slug" element={<AnimeDetailPage />} />
            </Routes>
          </MainLayout>
        }
      />
    </Routes>
  );
};

// AppContent now just renders AppRoutes
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

  return <AppRoutes />;
};

// Main App component
function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <UserProvider>
        <Router>
          <Navigation />
          <AppContent />
        </Router>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;