import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import Search from "./UI/Search";
import Card from './UI/Card';
import Loading from './Loading';
import { useApp } from '../Contexts/AppContext';
import useMovie from '../Hooks/useMovie';


function Catalogue(){
    const { setSearchQuery, searchQuery, user } = useApp();
    const { movies, isLoading } = useMovie()

    const handleClick = (val) => {
        setSearchQuery(val);
    }

    return (
        <div className="h-full space-y-4 px-4">
            <div className="flex justify-start text-gray-300">
                <div className="flex items-center space-x-6">
                    <nav>
                        <ul className="flex space-x-6">
                            <li onClick={()=>handleClick('Movies')} className="hover:text-purple-400">Movies</li>
                            <li onClick={(e)=>handleClick('Series')} className="hover:text-purple-400">Series</li>
                            <li onClick={(e)=>handleClick('Documentaries')} className="hover:text-purple-400">Documentaries</li>
                        </ul>
                    </nav>
                </div>
            </div>
            <Search />

            <div className='ml-6 mt-16 text-white font-bold text-3xl'>{searchQuery}</div>
            { 
                isLoading ? ( <Loading />) : (
                    <div className={`md:grid ${user ? 'grid-cols-4' : 'grid-cols-5'}`}>
                        {movies.map(movie => <Card movie={movie} />)}
                    </div>
                )
            }
        </div>
    );
};

export default Catalogue;
