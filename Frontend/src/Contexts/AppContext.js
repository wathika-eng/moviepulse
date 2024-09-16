import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';
const AppContext = createContext();

const BASE_URL = 'https://moviepulse.onrender.com/api';

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('Trending');

  const login = (userData) => {

      setUser(userData);
      axios.post(`${BASE_URL}/login`, userData)
      .then(response => {
        console.log("Login Success", response.data)
        setUser(response.data);
        return 'success';
      })
      .catch((error) => {
        console.log("An Error Occured while Loggin in", error);
        return 'Error';
      })
  };

  const register = (userData) => {
    console.log(userData)
    axios.post(`${BASE_URL}/signin`, userData)
    .then((response) => {
      console.log("Registration Success", response.data)
      return 'success';
    })
    .catch((error) => {
      console.log("An Error Occured While Creating User", error)
      return 'Error';
    })
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