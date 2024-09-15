import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios';
import Search from "./UI/Search";
import Card from './UI/Card';
import Loading from './Loading';
import { useApp } from '../Contexts/AppContext';

const apiKey = process.env.REACT_APP_apiKey;
const baseUrl = 'https://api.themoviedb.org/3';

function Catalogue(){
    const [movies, setMovies] = useState([])
    const [isLoading, setIsLoading] = useState(false);

    const { searchQuery } = useApp();
    useEffect(()=>{
        setIsLoading(true);
        async function searchMovies(searchQuery){
            try {
                const response = await axios.get(`${baseUrl}/search/movie`, {
                    params: {
                        api_key: apiKey,
                        query: searchQuery,
                    },
                });
                setMovies(response.data.results);
                setIsLoading(false);

            } catch (error){
                setIsLoading(false);
                console.log("Error", error.message);
            }
        }

        searchMovies(searchQuery);
    }, [searchQuery])

    return (
        <div className="h-full space-y-4 px-4">
            <div className="flex justify-start">
                <div className="mt-8 text-white flex flex-col pt-10 space-y-2  justify-end">
                    <span className="text-5xl font-bold text-gray-200">Movie Pulse</span>
                    <span className="text-gray-300">
                        <p>List of movies and TV Shows, I have watched till date.</p>
                        <p>Explore what I have watched and also feel free to make a suggestion. 😉</p>
                    </span>
                </div>
            </div>
            <Search />
            { 
                isLoading ? ( <Loading />) : (
                    <div className="md:grid grid-cols-5 gap-5">
                        {movies.map(movie => <Card movie={movie} />)}
                    </div>
                )
            }
        </div>
    );
};

export default Catalogue;
