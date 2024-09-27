import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Search from './UI/Search';
import Card from './UI/Card';
import Loading from './Loading';
import { useApp } from '../Contexts/AppContext';
import useMovie from '../Hooks/useMovie';

function Catalogue() {
	const { setSearchQuery, searchQuery } = useApp();
	const [currentPage, setCurrentPage] = useState(1);
	const {
		movies = [],
		isLoading,
		totalPages,
	} = useMovie(searchQuery, currentPage);

	useEffect(() => {
		// Log to debug
		console.log('Search Query:', searchQuery);
		console.log('Current Page:', currentPage);
	}, [searchQuery, currentPage]);

	const handleClick = (val) => {
		setSearchQuery(val);
		setCurrentPage(1); // Reset to first page on search query change
	};

	const handlePageChange = (newPage) => {
		if (newPage >= 1 && newPage <= totalPages) {
			setCurrentPage(newPage);
		}
	};

	return (
		<div className='min-h-screen px-4 py-8 bg-gray-900'>
			<div className='flex justify-start mb-8'>
				<nav className='text-gray-300'>
					<ul className='flex space-x-6'>
						<li
							onClick={() => handleClick('Movies')}
							className='cursor-pointer hover:text-purple-400 transition duration-300'>
							Movies
						</li>
						<li
							onClick={() => handleClick('Series')}
							className='cursor-pointer hover:text-purple-400 transition duration-300'>
							Series
						</li>
						<li
							onClick={() => handleClick('Documentaries')}
							className='cursor-pointer hover:text-purple-400 transition duration-300'>
							Documentaries
						</li>
					</ul>
				</nav>
			</div>

			<Search />

			<div className='mt-10 mb-4 text-white font-bold text-3xl'>
				{searchQuery}
			</div>

			{isLoading ? (
				<Loading />
			) : (
				<>
					<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
						{movies.length ? (
							movies.map((movie) => (
								<Link key={movie.id} to={`/movie/${movie.id}`}>
									<Card movie={movie} />
								</Link>
							))
						) : (
							<p className='text-white'>No movies found</p>
						)}
					</div>

					
					<div className='flex justify-center mt-8'>
						<button
							onClick={() => handlePageChange(currentPage - 1)}
							disabled={currentPage === 1}
							className='bg-gray-700 text-white px-4 py-2 rounded-lg mr-2'>
							Previous
						</button>
						<span className='text-white mx-4'>
							Page {currentPage} of {totalPages}
						</span>
						<button
							onClick={() => handlePageChange(currentPage + 1)}
							disabled={currentPage === totalPages}
							className='bg-gray-700 text-white px-4 py-2 rounded-lg'>
							Next
						</button>
					</div>
				</>
			)}
		</div>
	);
}

export default Catalogue;
