import { useState } from "react";
import { FaUser } from "react-icons/fa6";
import { IoMdArrowDropdown } from "react-icons/io";
import { useApp } from "../Contexts/AppContext";
import DropdownMenu from "./DropdownMenu";

function TopBar() {
    const [ isOpen, setIsOpen ] = useState(false);

    const { setSearchQuery } = useApp();

    const handleLink = (searchQ) => {
        setSearchQuery(searchQ);
    }

    const toggleDropDown = ()=> {
        setIsOpen(!isOpen);
    }

    return (
        <div className="fixed top-0 w-full  z-10">
            <div className=" text-gray-300  flex justify-end md:px-10 px-2 space-x-4 py-1 bg-[#121829]">
                <div className="space-x-4">
                    <span className="text-xl cursor-pointer" onClick={() => handleLink('movies')}>Movies</span>
                    <span className="text-xl cursor-pointer" onClick={() => handleLink('tv shows')}>TV shows</span>
                </div>
                <div className="flex md:hidden items-center space-x-1">
                    <div className="border rounded-full p-1">
                        <FaUser size={20} />
                    </div>
                    <IoMdArrowDropdown className="text-white" onClick={toggleDropDown} size={25}/>
                </div>
            </div>
            <div className={`${!isOpen ? 'hidden': 'bg-gray-700 text-white'}`}>
                <DropdownMenu />
            </div>
        </div>
    )
};

export default TopBar;