import React from 'react';
import {
	FaHome,
	FaHeart,
	FaFire,
	FaSignOutAlt,
	FaRegClock,
} from 'react-icons/fa';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Assuming you're using react-router for navigation

const SidebarPage = () => {
	const handleLogout = () => {
		localStorage.removeItem('accessToken');
		localStorage.removeItem('refreshToken');
		axios.post('http://127:0.0.1:8000/api/logout/', null, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
			},
		});
	};
	return (
		<div className='w-44 border-r border-gray-700 h-screen bg-gray-800 text-white flex flex-col fixed'>
			{/* Watch Icon Heading */}
			<div className='flex items-center p-4 bg-gray-900 border-b border-gray-700'>
				<FaRegClock className='text-yellow-400 text-2xl mr-3' />
				<span className='text-lg font-semibold'>Watch List</span>
			</div>

			{/* Top Section: Home, Favorites, Trending */}
			<ul className='flex-1 mt-4 space-y-2'>
				<li className='flex items-center p-4 hover:bg-gray-700 cursor-pointer'>
					<Link to='/' className='flex items-center w-full'>
						<FaHome className='text-blue-500 mr-3' />
						<span>Home</span>
					</Link>
				</li>
				<li className='flex items-center p-4 hover:bg-gray-700 cursor-pointer'>
					<Link to='/favorites' className='flex items-center w-full'>
						<FaHeart className='text-red-500 mr-3' />
						<span>Favorites</span>
					</Link>
				</li>
				<li className='flex items-center p-4 hover:bg-gray-700 cursor-pointer'>
					<Link to='/trending' className='flex items-center w-full'>
						<FaFire className='text-yellow-500 mr-3' />
						<span>Trending</span>
					</Link>
				</li>
			</ul>

			{/* Bottom Section: Logout */}
			<div className='mt-auto'>
				<ul className='border-t border-gray-700'>
					<li className='flex items-center p-4 hover:bg-gray-700 cursor-pointer'>
						<FaSignOutAlt className='text-red-600 mr-3' />
						<span onClick={handleLogout}>Log Out</span>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default SidebarPage;
