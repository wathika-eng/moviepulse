import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useMovie from '../Hooks/useMovie';
const BASE_URL = 'https://image.tmdb.org/t/p/w500';
const YOUR_API_KEY = process.env.REACT_APP_TMDB_apiKey;
function MovieDetail() {
	const { id } = useParams();
	const [movie, setMovie] = useState(null);
	const [trailer, setTrailer] = useState(null);
	const { movies } = useMovie('', 1); // You may fetch only one movie by ID here

	useEffect(() => {
		const fetchMovie = async () => {
			const movieData = movies.find((movie) => movie.id === parseInt(id));
			if (movieData) {
				setMovie(movieData);

				// Fetch trailer
				const trailerResponse = await fetch(
					`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${YOUR_API_KEY}&language=en-US`
				);
				const trailerData = await trailerResponse.json();
				const trailer = trailerData.results.find(
					(video) => video.type === 'Trailer'
				);
				setTrailer(trailer);
			}
		};
		fetchMovie();
	}, [id, movies]);

	if (!movie) return <div>Loading...</div>;

	return (
		<div className='min-h-screen px-4 py-8 bg-gray-900'>
			<div className='text-white'>
				<h1 className='text-4xl font-bold'>{movie.title}</h1>
				<img
					src={`${BASE_URL}${movie.poster_path}`}
					alt={movie.title}
					className='w-full h-80 object-cover mt-4'
				/>
				<p className='mt-4'>{movie.overview}</p>
				<p className='mt-4'>Release Date: {movie.release_date}</p>
				<p className='mt-4'>Rating: {movie.vote_average}</p>

				{trailer && (
					<div className='mt-4'>
						<h2 className='text-2xl font-semibold'>Trailer</h2>
						<iframe
							width='560'
							height='315'
							src={`https://www.youtube.com/embed/${trailer.key}`}
							title={`${movie.title} Trailer`}
							frameBorder='0'
							allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
							allowFullScreen></iframe>
					</div>
				)}
			</div>
		</div>
	);
}

export default MovieDetail;
