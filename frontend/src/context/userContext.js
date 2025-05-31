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
              username: decoded.username
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

  const login = (token) => {
    try {
      const decoded = jwtDecode(token);
      localStorage.setItem('token', token);
      setIsAuthenticated(true);
      setUserInfo({
        userId: decoded.userId,
        username: decoded.username
      });
    } catch (error) {
      console.error('Error during login:', error);
      localStorage.removeItem('token');
      setIsAuthenticated(false);
      setUserInfo(null);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUserInfo(null);
  };

  const getUserInfo = () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return null;
      const decoded = jwtDecode(token);
      return {
        userId: decoded.userId,
        username: decoded.username,
        token: token  // Include the token in the returned object
      };
    } catch (error) {
      console.error('Error getting user info:', error);
      return null;
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
      getUserInfo
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