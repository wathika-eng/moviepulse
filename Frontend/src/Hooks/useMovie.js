 import { useState, useEffect } from 'react';
import axios from 'axios';
import { useApp } from '../Contexts/AppContext';

const tmdb_apiKey = process.env.REACT_APP_TMDB_apiKey;
const gemini_apikey = process.env.REACT_APP_GEMINI_apikey;
const baseUrl = 'https://api.themoviedb.org/3';


const queryGeminiAI = async (userQuery) => {
    try {
      const response = await axios.post('https://api.gemini.ai/search', {
      searchQuery: userQuery,
      apiKey: gemini_apikey,
    });
    return response.data;
    } catch (error) {
      console.error('Error querying Gemini AI:', error);
      return null;
    }
  };



  function useMovie () {
    const [ movies, setMovies ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(false);
    const { searchQuery } = useApp(); 


    useEffect(() => {
        async function  getMovie(){
            try {
                const geminiResults = await queryGeminiAI(searchQuery);
                console.log("GEMINI SEARCH RESULTS::::", geminiResults);

                const response = await axios.get(`${baseUrl}/search/movie`, {
                    params: {
                        api_key: tmdb_apiKey,
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

        getMovie();
    }, [searchQuery])


    return {
        isLoading,
        movies,
    }
  }
  

  export default useMovie;