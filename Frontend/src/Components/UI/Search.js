import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useApp } from "../../Contexts/AppContext";

function Search(){
    const { searchQuery, setSearchQuery } = useApp();
    const [ formData, setFormData ] = useState({
        'searchQuery': '',
    })


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({...formData, [name]: value})
    }

    const handleSearch = () => {
        setSearchQuery(formData.searchQuery)
    }

    return (
        <div>
            <form onSubmit={handleSearch}>
                <div>
                    <FaSearch size={24} className="relative top-8 left-[19rem] md:top-8 md:left-[22rem]" color="gray" />
                    <input 
                        name="searchQuery" 
                        value={formData.searchQuery} 
                        onChange={(e)=> {handleChange(e)}}  
                        placeholder="search" 
                        className="text-gray-200 text-xl w-full md:w-96 border-2 border-gray-600 outline-none bg-[#0d1f33] rounded  px-2 py-1 md:py-2" 
                    />
                </div>
            </form>
        </div>
    )
}

export default Search;