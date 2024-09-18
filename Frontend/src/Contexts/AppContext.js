import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';
const AppContext = createContext();

const BASE_URL = 'https://moviepulse.onrender.com/api';

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('Trending');

  const login = async (userData) => {
    try {
      const response = axios.post(`${BASE_URL}/login/`, userData);
      console.log(response.data);
      setUser(userData);
      return 'success';
    } catch(err) {
      console.log('Error while loging in', err);
      return 'error'
    }
  };

  const register = async (userData) => {
    try {
      const response = axios.post(`${BASE_URL}/register/`, userData);
      console.log(response.data);
      setUser(userData);
      return 'success';
    } catch (err) {
      console.log("Error while signing up", err);
      return 'error';
    }
  }

  const logout = () => {
    setUser(null);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const contextValue = { 
    searchQuery, setSearchQuery, 
    user, login, 
    logout, register, 
    isDarkMode, toggleTheme 
  }

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);