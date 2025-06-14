// context/userContext.js used to establish a global context for the user upon app loading
// allows for user context to be accessed across files and pages
import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

// create context using react library
const UserContext = createContext();

// export userprovider to establish link between all pages
// initialize data to be empty
export const UserProvider = ({ children }) => {
  const [isInitializing, setIsInitializing] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const initializeAuth = () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          // Verify token is valid by attempting to decode it
          const decoded = jwtDecode(token);
          
          // Check if token is expired
          const currentTime = Date.now() / 1000;
          if (decoded.exp < currentTime) {
            console.log('Token expired');
            localStorage.removeItem('token');
            setIsAuthenticated(false);
            setUserInfo(null);
          } else {
            setIsAuthenticated(true);
            setUserInfo({
              userId: decoded.userId,
              username: decoded.username,
              display_name: decoded.display_name,
              avatar_url: decoded.avatar_url
            });
          }
        } else {
          setIsAuthenticated(false);
          setUserInfo(null);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        setIsAuthenticated(false);
        setUserInfo(null);
        localStorage.removeItem('token');
      } finally {
        setIsInitializing(false);
      }
    };

    initializeAuth();
  }, []);

  const login = (token, userData) => {
    try {
      console.log('Login function called with token:', token ? 'Token present' : 'No token');
      const decoded = jwtDecode(token);
      console.log('Decoded token:', decoded);
      
      localStorage.setItem('token', token);
      setIsAuthenticated(true);
      setUserInfo({
        userId: decoded.userId,
        username: decoded.username,
        display_name: decoded.display_name || userData?.display_name || decoded.username,
        avatar_url: decoded.avatar_url || userData?.avatar_url
      });
      console.log('Login successful, user info set:', {
        userId: decoded.userId,
        username: decoded.username,
        display_name: decoded.display_name || userData?.display_name || decoded.username,
        avatar_url: decoded.avatar_url || userData?.avatar_url
      });
    } catch (error) {
      console.error('Error during login:', error);
      localStorage.removeItem('token');
      setIsAuthenticated(false);
      setUserInfo(null);
    }
  };

  const logout = () => {
    console.log('Logout called');
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUserInfo(null);
    console.log('Logout completed');
  };

  const getUserInfo = () => {
    try {
      // console.log('getUserInfo called');
      const token = localStorage.getItem('token');
      if (!token) {
        console.log('No token found in localStorage');
        return null;
      }
      const decoded = jwtDecode(token);
      // console.log('Decoded user info:', decoded);
      return {
        userId: decoded.userId,
        username: decoded.username,
        display_name: decoded.display_name,
        avatar_url: decoded.avatar_url,
        token: token  // Include the token in the returned object
      };
    } catch (error) {
      console.error('Error getting user info:', error);
      return null;
    }
  };

  const updateUserInfo = (newUserInfo) => {
    setUserInfo(prevInfo => ({
      ...prevInfo,
      ...newUserInfo
    }));
  };

  const setToken = (token) => {
    try {
      console.log('Setting token in context...');
      const decoded = jwtDecode(token);
      console.log('Decoded token:', decoded);
      
      localStorage.setItem('token', token);
      setIsAuthenticated(true);
      setUserInfo({
        userId: decoded.userId,
        username: decoded.username,
        display_name: decoded.display_name,
        avatar_url: decoded.avatar_url
      });
      console.log('Token set successfully in context');
    } catch (error) {
      console.error('Error setting token:', error);
      localStorage.removeItem('token');
      setIsAuthenticated(false);
      setUserInfo(null);
    }
  };

  // setup formatting for user context provider to be used in app.js
  return (
    <UserContext.Provider value={{ 
      isAuthenticated, 
      isInitializing,
      userInfo,
      login,
      logout,
      getUserInfo,
      updateUserInfo,
      setToken
    }}>
      {children}
    </UserContext.Provider>
  );
};

// set user context on export
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};