import React, { useState, useEffect } from 'react';

const Favourite = () => {
	const [favourites, setFavourites] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		// Fetch favourites from localStorage instead of making an API request
		const fetchFavouritesFromLocalStorage = () => {
			const storedFavourites =
				JSON.parse(localStorage.getItem('favorites')) || [];
			setFavourites(storedFavourites);
			setIsLoading(false);
		};

		fetchFavouritesFromLocalStorage();
	}, []);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (favourites.length === 0) {
		return <div className='text-white'>No favourites found.</div>;
	}

	return (
		<div>
			<h1 className='text-2xl font-semibold text-white mb-4'>Favourites</h1>
			<div className='grid grid-cols-3 gap-4'>
				{favourites.map((favourite) => (
					<div
						key={favourite.id}
						className='bg-gray-800 rounded-lg overflow-hidden shadow-lg transition transform hover:scale-105 duration-300'>
						<img
							src={`https://image.tmdb.org/t/p/w500${favourite.poster_path}`}
							alt={favourite.title}
							className='w-full h-72 object-cover'
						/>
						<div className='p-4'>
							<h3 className='text-white text-lg font-semibold'>
								{favourite.title}
							</h3>
							<p className='text-gray-400 text-sm'>{favourite.release_date}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Favourite;
