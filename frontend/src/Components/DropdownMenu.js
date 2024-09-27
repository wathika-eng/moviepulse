import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaMoon, FaSun, FaSignOutAlt } from 'react-icons/fa';
import { useApp } from '../Contexts/AppContext';

function DropdownMenu({ username }) {
	const [isOpen, setIsOpen] = useState(false);
	const [userDetails, setUserDetails] = useState(null);
	const navigate = useNavigate();
	const { logout, toggleTheme, theme } = useApp();

	useEffect(() => {
		if (isOpen) {
			// Fetch user details when dropdown is opened
			fetch('http://127.0.0.1:8000/api/me/', {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
				},
			})
				.then((response) => response.json())
				.then((data) => setUserDetails(data))
				.catch((error) => console.error('Error fetching user details:', error));
		}
	}, [isOpen]);
	// console.log(userDetails);
	const handleMyAccount = () => {
		navigate('/account');
		setIsOpen(false);
	};

	const handleToggleTheme = () => {
		toggleTheme();
		setIsOpen(false);
	};

	const handleLogout = () => {
		logout();
		navigate('/');
		setIsOpen(false);
	};

	return (
		<div className='relative z-50'>
			<button
				onClick={() => setIsOpen(!isOpen)}
				className='flex items-center space-x-2 focus:outline-none text-gray-300 hover:text-white'>
				<FaUser className='border rounded-full p-0.5' size={28} />
				<span>{userDetails ? userDetails.email : 'Loading...'}</span>
			</button>
			{isOpen && (
				<div className='absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 border border-gray-200 dark:border-gray-700 z-50'>
					{userDetails && (
						<div className='p-4 border-b border-gray-200 dark:border-gray-700'>
							<div className='flex items-center space-x-4'>
								<img
									src={userDetails.profile_pic}
									alt='Profile'
									className='w-16 h-16 rounded-full object-cover'
								/>
								<div>
									<h3 className='text-lg font-semibold text-gray-800 dark:text-white'>
										{userDetails.first_name} {userDetails.last_name}
									</h3>
									<p className='text-sm text-gray-600 dark:text-gray-300'>
										{userDetails.email}
									</p>
								</div>
							</div>
							<div className='mt-4 text-sm text-gray-600 dark:text-gray-400'>
								<p>Last login: {userDetails.last_login}</p>
								<p>Joined: {userDetails.date_joined}</p>
							</div>
						</div>
					)}
					<button
						className='flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
						onClick={handleMyAccount}>
						<FaUser className='mr-2' />
						My Account
					</button>
					<button
						className='flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
						onClick={handleToggleTheme}>
						{theme === 'dark' ? (
							<FaSun className='mr-2' />
						) : (
							<FaMoon className='mr-2' />
						)}
						Toggle Theme
					</button>
					<button
						className='flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
						onClick={handleLogout}>
						<FaSignOutAlt className='mr-2' />
						Logout
					</button>
				</div>
			)}
		</div>
	);
}

export default DropdownMenu;
