import React, { useState } from 'react';
import { useApp } from '../Contexts/AppContext';

const Search = () => {
	const { setSearchQuery } = useApp();
	const [input, setInput] = useState('');

	const handleSearch = () => {
		setSearchQuery(input);
	};

	return (
		<div className='mb-8'>
			<input
				type='text'
				value={input}
				onChange={(e) => setInput(e.target.value)}
				className='p-2 rounded-lg'
			/>
			<button
				onClick={handleSearch}
				className='ml-2 p-2 bg-gray-700 text-white rounded-lg'>
				Search
			</button>
		</div>
	);
};

export default Search;
