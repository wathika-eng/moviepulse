import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const BASE_URL = 'https://image.tmdb.org/t/p/w500'; // Base URL for image service

const Card = ({ movie }) => {
	// Load favorites from localStorage or initialize as an empty array
	const [isFavorite, setIsFavorite] = useState(false);

	// Check if the movie is already in the favorites when the component mounts
	useEffect(() => {
		const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
		const isFav = storedFavorites.some((favMovie) => favMovie.id === movie.id);
		setIsFavorite(isFav);
	}, [movie.id]);

	const handleFavoriteClick = () => {
		let storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];

		if (isFavorite) {
			// Remove from favorites
			storedFavorites = storedFavorites.filter(
				(favMovie) => favMovie.id !== movie.id
			);
		} else {
			// Add to favorites
			storedFavorites.push(movie);
		}

		// Update localStorage and component state
		localStorage.setItem('favorites', JSON.stringify(storedFavorites));
		setIsFavorite(!isFavorite);
	};

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
			<button
				onClick={handleFavoriteClick}
				className={`p-2 text-white rounded ${
					isFavorite ? 'bg-red-500' : 'bg-gray-500'
				}`}>
				{isFavorite ? 'Remove Favorite' : 'Add to Favorites'}
			</button>
		</div>
	);
};

export default Card;
