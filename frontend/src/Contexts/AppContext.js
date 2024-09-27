import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AppContext = createContext();
const BASE_URL = 'http://127.0.0.1:8000/api';

export const AppProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [isDarkMode, setIsDarkMode] = useState(false);
	const [searchQuery, setSearchQuery] = useState('Trending');
	useEffect(() => {
		const token = localStorage.getItem('accessToken');
		if (token) {
			setUser({ token });
		}
	}, []);

	const login = async (userData) => {
		try {
			const response = await axios.post(`${BASE_URL}/login/`, userData);
			const { access, refresh } = response.data;
			localStorage.setItem('accessToken', access);
			localStorage.setItem('refreshToken', refresh);

			setUser(response.data);
			toast.success('Login successful!', { autoClose: 3000 });

			return true;
		} catch (error) {
			console.error('An error occurred while logging in', error);
			toast.error('Login failed! Please check your credentials.', {
				autoClose: 3000,
			});
			return false;
		}
	};

	const register = async (userData) => {
		try {
			await axios.post(`${BASE_URL}/register/`, userData);
			toast.success('Registration successful!', { autoClose: 3000 });
			return true;
		} catch (error) {
			toast.error('Registration failed! Please try again.', {
				autoClose: 3000,
			});
			return false;
		}
	};

	const logout = () => {
		axios.post(`${BASE_URL}/logout/`, null, {
			headers: {
				Authorization: `Bearer ${user.token}`,
			},
		});
		localStorage.removeItem('accessToken');
		localStorage.removeItem('refreshToken');
		setUser(null);
		toast.success('Logout successful!', { autoClose: 3000 });
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
