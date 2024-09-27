import { useEffect, useState } from 'react';

const useMovie = (searchQuery, currentPage) => {
	const [movies, setMovies] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [totalPages, setTotalPages] = useState(0);

	useEffect(() => {
		const fetchMovies = async () => {
			setIsLoading(true);
			try {
				const response = await fetch(
					`https://moviepulse.onrender.com/api/movies/?query=${searchQuery}&page=${currentPage}`
				);
				const data = await response.json();
				setMovies(data.results);
				setTotalPages(Math.ceil(data.count / 10)); // Adjust based on the items per page
			} catch (error) {
				console.error('Failed to fetch movies:', error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchMovies();
	}, [searchQuery, currentPage]);

	return { movies, isLoading, totalPages };
};

export default useMovie;
