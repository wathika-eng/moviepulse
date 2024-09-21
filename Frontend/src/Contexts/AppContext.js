import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AppContext = createContext();
const BASE_URL = 'https://moviepulse.onrender.com/api';

export const AppProvider = ({ children }) => {
	const [user, setUser] = useState(null); // Use null for non-authenticated state
	const [isDarkMode, setIsDarkMode] = useState(false);
	const [searchQuery, setSearchQuery] = useState('Trending');

	// Check for existing token on load
	useEffect(() => {
		const token = localStorage.getItem('accessToken');
		if (token) {
			// Optionally, validate token by making a request to your API
			setUser({ token }); // Set the user with token on initial load
		}
	}, []);



	const login = async (userData) => {
		try {
			const response = await axios.post(`${BASE_URL}/login/`, userData)
			console.log("LOGIN RESPONSE::", response.data.access)
			localStorage.setItem("accessToken", response.data.access)
			toast.success("Login Successful", { autoClose: 3000});
			setUser(userData)
			return 'success';
		} catch(error) {
			toast.error("Login failed! Please check your credentials")
			console.log("Error while logging in", error);
			return 'error';
		}
	}

	const register = async (userData) => {

		try {
			const response = await axios.post(`${BASE_URL}/login/`, userData);
			console.log("REGISTER RESPONSE::", response);
			toast.success('Registration successful!', { autoClose: 3000 });
			return 'success'

		} catch (error) {
			console.error('An error occurred while creating user', error);
			toast.error('Registration failed! Please try again.', { autoClose: 3000 })
			return 'error'
		}
	};

	const logout = () => {
		localStorage.removeItem('accessToken');
		localStorage.removeItem('refreshToken');
		setUser(null);
		toast.info('You have been logged out.', { autoClose: 3000 });
	};

	const toggleTheme = () => {
		setIsDarkMode(!isDarkMode);
	};

	const contextValue = {
		searchQuery,
		setSearchQuery,
		user,
		login,
		logout,
		register,
		isDarkMode,
		toggleTheme,
	};

	return (
		<AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
	);
};

export const useApp = () => useContext(AppContext);