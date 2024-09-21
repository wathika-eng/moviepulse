import React from 'react';
import { Link } from 'react-router-dom';

const BASE_URL = 'https://image.tmdb.org/t/p/w500'; // Base URL for image service

const Card = ({ movie }) => {
	return (
		<div className='bg-gray-800 rounded-lg overflow-hidden shadow-lg transition transform hover:scale-105 duration-300'>
			<Link to={`/movie/${movie.id}`}>
				<img
					src={`${BASE_URL}${movie.poster_path}`} // Construct full image URL
					alt={movie.title}
					className='w-full h-72 object-cover'
				/>
				<div className='p-4'>
					<h3 className='text-white text-lg font-semibold'>{movie.title}</h3>
					<p className='text-gray-400 text-sm'>{movie.release_date}</p>
				</div>
			</Link>
		</div>
	);
};

export default Card;