import React, { createContext, useState, useContext } from 'react';
const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('horror');

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const contextValue = { 
    searchQuery, setSearchQuery, 
    user, login, 
    logout, 
    isDarkMode, toggleTheme 
  }

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);