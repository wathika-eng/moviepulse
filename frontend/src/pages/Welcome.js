import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import welcomeBackground from '../images/welcome-background.jpg';
import LoginModal from '../Components/LoginModal';

const WelcomeScreen = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const toggleLoginModal = () => {
		setIsModalOpen(!isModalOpen);
	};

	return (
		<div
			className='flex items-center justify-center min-h-screen bg-cover bg-center bg-opacity-90'
			style={{
				backgroundColor: 'rgba(13, 31, 51, 0.5)', // This is the hex equivalent of rgb(43, 19, 55)
				backgroundImage: `linear-gradient(90deg, rgba(13, 31, 51, 0.9), rgba(13, 31, 51, 0.5)), url(${welcomeBackground})`,
			}}>
			<div className='text-center'>
				<h1 className='text-4xl font-bold text-white mb-2'>Movie Pulse</h1>
				<p className='text-sm text-gray-300 mb-8'>Enjoy the latest movies</p>
				<button
					onClick={toggleLoginModal}
					className='bg-[#0d1f33a6] text-white px-12 py-2 rounded-full text-sm font-medium hover:bg-[#0d1f33] transition duration-300 mb-4 w-full'>
					Log in
				</button>
				<Link to={'/home'} className='text-gray-400 text-xs'>
					Continue without log in
				</Link>
			</div>
			{isModalOpen ? (
				<LoginModal isOpen={isModalOpen} onClose={toggleLoginModal} />
			) : null}
		</div>
	);
};

export default WelcomeScreen;
