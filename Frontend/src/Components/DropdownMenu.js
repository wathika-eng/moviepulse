
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser } from "react-icons/fa6";
import { useApp } from '../Contexts/AppContext';


function DropdownMenu({ username }){
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { logout, toggleTheme } = useApp();

  const handleMyAccount = () => {
    navigate('/account');
    setIsOpen(false);
  };

  const handleToggleTheme = () => {
    toggleTheme();
    setIsOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
  };

  return (
    <div className="relative z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 focus:outline-none text-gray-300 hover:text-white"
      >
        <FaUser className='border rounded-full p-0.5' size={28}  />
        <span>{username}</span>
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 border border-gray-700 z-50">
          <button
            className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white w-full text-left"
            onClick={handleMyAccount}
          >
            My Account
          </button>
          <button
            className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white w-full text-left"
            onClick={handleToggleTheme}
          >
            Toggle Theme
          </button>
          <button
            className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white w-full text-left"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;